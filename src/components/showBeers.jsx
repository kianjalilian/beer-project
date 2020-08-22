import React, { Component } from "react";
import { getFoodBeers } from "../services/beerService";
import { paginate } from "../utilities/paginate";
import CardDeck from "../common/cardDeck";
import Pagination from "../common/pagination";
import ModalPopup from "./modalPopup";
import _ from "lodash";
import SortDeck from "../common/sortDeck";
import { toast } from "react-toastify";
import "./showBeers.css";

class ShowBeers extends Component {
   state = {
      pageSize: 9,
      currentPage: 1,
      columnLarge: 3,
      column: 1,
      beerList: [],
      food: "all",
      showFavorite: false,
      showPopup: false,
      popupItem: {},
      count: 1,
      shoppingCart: [],
      currentSort: {},
   };

   sorts = [
      { path: "name", order: "asc" },
      { path: "name", order: "desc" },
      { path: "abv", order: "asc" },
      { path: "abv", order: "desc" },
   ];

   likeDuration = 1000 * 60 * 60 * 24 * 30;

   componentDidMount() {
      this.getBeerList();
      console.log();
      let shoppingCart;
      if (localStorage.getItem("ShoppingCart") === "") {
         shoppingCart = [];
      } else {
         shoppingCart = JSON.parse(localStorage.getItem("ShoppingCart"));
      }
      const currentSort = this.sorts[0];
      if (shoppingCart === null) {
         localStorage.setItem("ShoppingCart", []);
         this.setState({ currentSort });
      } else {
         this.setState({ shoppingCart, currentSort });
      }
   }

   componentDidUpdate() {
      const { food, showFavorite } = this.props;
      if (
         food !== this.state.food ||
         showFavorite !== this.state.showFavorite
      ) {
         window.scrollTo(0, 0);
         this.getBeerList();
      }
   }

   getBeerList = async () => {
      const { food, showFavorite } = this.props;
      let beerList;
      try {
         const { data } = await getFoodBeers(food);
         beerList = data;
      } catch (error) {
         if (error.response && error.response.status === 404) {
            toast.error("We can't access the brew api.");
         }
      }
      this.checkLikeExpiration(beerList);
      this.checkBeerLike(beerList);
      if (showFavorite) {
         beerList = this.filterFavorite(beerList);
      }
      this.setState({ beerList, food, currentPage: 1, showFavorite });
   };

   checkLikeExpiration = (beerList) => {
      const checkTime = new Date();
      for (let beer of beerList) {
         const creationTime = localStorage.getItem(beer.id);
         if (
            creationTime !== null &&
            checkTime - creationTime > this.likeDuration
         ) {
            localStorage.removeItem(beer.id);
         }
      }
   };

   checkBeerLike = (beerList) => {
      for (let beer of beerList) {
         beer.liked = localStorage.getItem(beer.id) === null ? false : true;
      }
   };

   filterFavorite = (beerList) => {
      return beerList.filter((beer) => beer.liked === true);
   };

   getPagedBeers = () => {
      const { beerList, currentPage, pageSize, currentSort } = this.state;
      const sortedBeerList = _.orderBy(
         beerList,
         [currentSort.path],
         [currentSort.order]
      );
      return paginate(sortedBeerList, currentPage, pageSize);
   };

   handlePageChange = (page) => {
      window.scrollTo(0, 0);
      this.setState({ currentPage: page });
   };

   handleCardClick = (item) => {
      const popupItem = item;
      const showPopup = true;
      this.setState({ showPopup, popupItem });
   };

   hidePopup = () => {
      const showPopup = false;
      const count = 1;
      this.setState({ showPopup, count });
   };

   handleLikeClick = (beer) => {
      const beerList = [...this.state.beerList];
      const index = beerList.indexOf(beer);
      beerList[index] = { ...beer };
      beerList[index].liked = !beerList[index].liked;
      if (beerList[index].liked) {
         const creationDate = new Date();
         localStorage.setItem(beer.id, creationDate.getTime());
      } else {
         localStorage.removeItem(beer.id);
      }
      this.setState({ beerList });
   };

   handleIncrease = () => {
      let { count } = this.state;
      count++;
      this.setState({ count });
   };

   handleDecrease = () => {
      let { count } = this.state;
      count = count > 1 ? count - 1 : 1;
      this.setState({ count });
   };

   handleAddToCart = () => {
      const time = new Date().getTime();
      localStorage.setItem("cartUpdateTime", time);
      let { count, popupItem } = this.state;
      const { image_url, name, srm } = popupItem;
      let shoppingCart;
      if (localStorage.getItem("ShoppingCart") === "") {
         shoppingCart = [];
      } else {
         shoppingCart = JSON.parse(localStorage.getItem("ShoppingCart"));
      }
      let newShoppingCart = [...shoppingCart];
      let alreadyExists = false;
      for (let item of newShoppingCart) {
         if (item.name === popupItem.name) {
            item.count += count;
            alreadyExists = true;
            break;
         }
      }
      if (alreadyExists === false) {
         newShoppingCart.push({
            image_url: image_url,
            name: name,
            price: srm,
            count: count,
         });
      }
      localStorage.setItem("ShoppingCart", JSON.stringify(newShoppingCart));
      count = 1;
      const showPopup = false;
      this.setState({ count, shoppingCart: newShoppingCart, showPopup });
   };

   handleSortChange = (sort) => {
      const currentPage = 1;
      this.setState({ currentSort: sort, currentPage });
   };

   render() {
      const beers = this.getPagedBeers();
      const totalCount = this.state.beerList.length;
      const {
         columnLarge,
         column,
         pageSize,
         currentPage,
         showPopup,
         popupItem,
         count,
         currentSort,
      } = this.state;

      return (
         <React.Fragment>
            <ModalPopup
               showPopup={showPopup}
               count={count}
               popupItem={popupItem}
               hidePopup={this.hidePopup}
               onAddToCart={this.handleAddToCart}
               onIncrease={this.handleIncrease}
               onDecrease={this.handleDecrease}
            />
            <SortDeck
               sorts={this.sorts}
               count={totalCount}
               activeSort={currentSort}
               onClick={this.handleSortChange}
            />
            <CardDeck
               items={beers}
               columnLarge={columnLarge}
               column={column}
               onCardClick={this.handleCardClick}
               onLikeClick={this.handleLikeClick}
            />
            <Pagination
               itemsCount={totalCount}
               pageSize={pageSize}
               currentPage={currentPage}
               onPageChange={this.handlePageChange}
            />
         </React.Fragment>
      );
   }
}

export default ShowBeers;
