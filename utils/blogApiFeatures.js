class apiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword?{
            title: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        }:{};

        this.query = this.query.find({...keyword});

        return this;
    }

    filter (){
        const filters = { ...this.queryStr };
        const ignore = ["keyword", "page"];
    
        ignore.forEach((key) => delete filters[key]);
  
        if(this.queryStr.tags){
          const tags = this.queryStr.tags.substring(1,this.queryStr.tags.length-1).split(",");
          this.queryStr.tags = {$in :tags};
        }

        this.query = this.query.find(this.queryStr).sort({createdAt:-1});

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