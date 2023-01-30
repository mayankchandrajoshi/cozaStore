class apiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    filter() {
      const filters = { ...this.queryStr };
      const ignore = ["keyword", "page"];
  
      ignore.forEach((key) => delete filters[key]);
  
      //Filter for rating and price
      let queryStr = JSON.stringify(filters);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      queryStr = JSON.parse(queryStr);

      if(queryStr.color){
        queryStr.$or=[ { color:queryStr.color }, { tags:queryStr.color } ]
        delete queryStr.color;
      }

      if(queryStr.tags){
        const tags = queryStr.tags.substring(1,queryStr.tags.length-1).split(",");
        queryStr.tags = {$in :tags};
      }

      const sortBy = JSON.parse(queryStr.sortBy);
      
      delete queryStr.sortBy;
      this.query = this.query.find(queryStr).sort(sortBy);
      return this;
    }
  
    pagination(resultPerPage) {
      const PageNo=this.queryStr.page||1;
      const previousDocument=resultPerPage*(PageNo-1);
      this.query=this.query.limit(resultPerPage).skip(previousDocument);
  
      return this;
    }
  }
  
module.exports = apiFeatures;