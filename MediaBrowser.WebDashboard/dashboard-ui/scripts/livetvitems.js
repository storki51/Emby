define(["cardBuilder","apphost","imageLoader","libraryMenu","libraryBrowser","loading","emby-itemscontainer"],function(cardBuilder,appHost,imageLoader,libraryMenu,libraryBrowser,loading){"use strict";return function(view,params){function getSavedQueryKey(){return libraryBrowser.getSavedQueryKey()}function reloadItems(page){loading.show();var promise="Recordings"==params.type?ApiClient.getLiveTvRecordings(query):"RecordingSeries"==params.type?ApiClient.getLiveTvRecordingSeries(query):"true"==params.IsAiring?ApiClient.getLiveTvRecommendedPrograms(query):ApiClient.getLiveTvPrograms(query);promise.then(function(result){function onNextPageClick(){query.StartIndex+=query.Limit,reloadItems(page)}function onPreviousPageClick(){query.StartIndex-=query.Limit,reloadItems(page)}window.scrollTo(0,0);var html="",pagingHtml=libraryBrowser.getQueryPagingHtml({startIndex:query.StartIndex,limit:query.Limit,totalRecordCount:result.TotalRecordCount,showLimit:!1});page.querySelector(".listTopPaging").innerHTML=pagingHtml,page.querySelector(".bottomPaging").innerHTML=pagingHtml,html=cardBuilder.getCardsHtml({items:result.Items,shape:query.IsMovie||"RecordingSeries"==params.type?"portrait":"auto",preferThumb:!query.IsMovie&&"RecordingSeries"!=params.type&&"auto",defaultShape:query.IsMovie||"RecordingSeries"==params.type?"portrait":"backdrop",inheritThumb:"Recordings"==params.type,context:"livetv",centerText:!0,overlayText:!1,showTitle:!0,showParentTitle:!query.IsMovie,showAirTime:"Recordings"!=params.type&&"RecordingSeries"!=params.type,showAirDateTime:"Recordings"!=params.type&&"RecordingSeries"!=params.type,overlayMoreButton:!0,showYear:query.IsMovie&&"Recordings"==params.type,showSeriesYear:"RecordingSeries"===params.type,coverImage:!0});var elem=page.querySelector(".itemsContainer");elem.innerHTML=html,imageLoader.lazyChildren(elem);var i,length,elems;for(elems=page.querySelectorAll(".btnNextPage"),i=0,length=elems.length;i<length;i++)elems[i].addEventListener("click",onNextPageClick);for(elems=page.querySelectorAll(".btnPreviousPage"),i=0,length=elems.length;i<length;i++)elems[i].addEventListener("click",onPreviousPageClick);libraryBrowser.saveQueryValues(getSavedQueryKey(),query),loading.hide()})}var query={UserId:Dashboard.getCurrentUserId(),StartIndex:0,Fields:"ChannelInfo,PrimaryImageAspectRatio",Limit:libraryBrowser.getDefaultPageSize()};"Recordings"==params.type?params.groupid&&(query.GroupId=params.groupid):"RecordingSeries"==params.type?(query.SortOrder="SortName",query.SortOrder="Ascending"):(query.HasAired=!1,query.SortBy="StartDate,SortName",query.SortOrder="Ascending"),view.addEventListener("viewbeforeshow",function(){query.ParentId=libraryMenu.getTopParentId();var page=this;"true"==params.IsMovie?query.IsMovie=!0:"false"==params.IsMovie&&(query.IsMovie=!1),"true"==params.IsSeries?query.IsSeries=!0:"false"==params.IsSeries&&(query.IsSeries=!1),"true"==params.IsNews?query.IsNews=!0:"false"==params.IsNews&&(query.IsNews=!1),"true"==params.IsSports?query.IsSports=!0:"false"==params.IsSports&&(query.IsSports=!1),"true"==params.IsKids?query.IsKids=!0:"false"==params.IsKids&&(query.IsKids=!1),"true"==params.IsAiring?query.IsAiring=!0:"false"==params.IsAiring&&(query.IsAiring=!1),"Recordings"==params.type?"true"==params.IsMovie?libraryMenu.setTitle(Globalize.translate("TabMovies")):"true"==params.IsSports?libraryMenu.setTitle(Globalize.translate("Sports")):"true"==params.IsKids?libraryMenu.setTitle(Globalize.translate("HeaderForKids")):libraryMenu.setTitle(Globalize.translate("TabRecordings")):"RecordingSeries"==params.type?libraryMenu.setTitle(Globalize.translate("TabShows")):"true"==params.IsMovie?libraryMenu.setTitle(Globalize.translate("TabMovies")):"true"==params.IsSports?libraryMenu.setTitle(Globalize.translate("Sports")):"true"==params.IsKids?libraryMenu.setTitle(Globalize.translate("HeaderForKids")):"true"==params.IsAiring?libraryMenu.setTitle(Globalize.translate("HeaderOnNow")):"true"==params.IsNews?libraryMenu.setTitle(Globalize.translate("News")):"true"==params.IsSeries?libraryMenu.setTitle(Globalize.translate("TabShows")):libraryMenu.setTitle(Globalize.translate("Programs"));var viewkey=getSavedQueryKey();libraryBrowser.loadSavedQueryValues(viewkey,query),reloadItems(page)})}});