class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    // searching by the name of product
    // additional feature -> if we search laptop bag then search results will show => 1.laptop bag, 2. laptop and 3. bag as well
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter(){
    // filter by category (FOR NOW) 
    // const queryCpy = this.queryStr   => passed by reference
    const queryCpy = {...this.queryStr}

    // Remove feilds for category
    const removeFields = ["keyword", "page", "limit"]

    // delete the fields
    removeFields.forEach(key => delete queryCpy[key])


    // filer for price range 
    let queryString = JSON.stringify(queryCpy)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key=>`$${key}`)


    this.query = this.query.find(JSON.parse(queryString))

    return this;
  }

    //pagination 
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this;
    }
}

module.exports = ApiFeatures;
