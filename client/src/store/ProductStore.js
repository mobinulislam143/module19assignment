import axios from 'axios'
import { create } from 'zustand'

const ProductStore = create((set) =>({
    BrandList:[],
    CategoryList:[],
    SliderList:[],
    ListBySmilier:[],
    ListByRemark:[],
    ProductList:[],

    SearchKeyword:"",
    SetSearchKeyword:async(keyword)=>{
        set({SearchKeyword:keyword})
    },

   

    ProductListRequest:async() =>{
        let res = await axios.get('/api/AllProduct')
        if(res.data['status'] === 'success'){
            set({ProductList:res.data['data']})
        }
    },
    BrandListRequest:async() =>{
        let res = await axios.get('/api/ProductBrandList')
        if(res.data['status'] === 'success'){
            set({BrandList:res.data['data']})
        }
    },
    CategoryListRequest:async()=>{
        let res = await axios.get('/api/ProductCategoryList')
        if(res.data['status']==='success'){
            set({CategoryList:res.data['data']})
        }
    },
 
// product
    ListProduct: null,
    ListByBrandRequest:async(BrandID)=>{
        set({ListProduct:null})
        let res= await axios.get(`/api/ProductListByBrand/${BrandID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    ListByKeywordRequest:async (Keyword)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/ProductListByKeyword/${Keyword}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    ListByCategoryRequest:async (CategoryID)=>{
        set({ListProduct:null})
        let res= await axios.get(`/api/ProductListByCategory/${CategoryID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']}) 
        }
    },
    ListByFilterRequest:async(postBody)=>{
        try{
            set({ListProduct:null})
            let res=await axios.post(`/api/ProductListByFilter`,postBody);
            if(res.data['status']==="success"){
                set({ListProduct:res.data['data']})
            }
        }catch(err){
            console.error("Error in Axios request:", err.toString());
        }
    },

    ListByRemarkRequest:async(Remark)=>{
        let res = await axios.get(`/api/ProductListByRemark/${Remark}`)
        if(res.data['status']==='success'){
            set({ListByRemark:res.data['data']})
        }
    },

    Details:null,
    DetailsRequest:async(id)=>{
        let res=await axios.get(`/api/ProductDetails/${id}`);
        if(res.data['status']==="success"){
            set({Details:res.data['data']})
        }
    },
    ReviewList:null,
    ReviewListRequest:async(id)=>{
        let res=await axios.get(`/api/ProductReviewList/${id}`);
        if(res.data['status']==="success"){
            set({ReviewList:res.data['data']})
        }
    },

    ListBySmilierRequest:async(CategoryID)=>{
        let res = await axios.get(`/api/ProductListBySmilier/${CategoryID}`)
        if(res.data['status']==='success'){
            set({ListBySmilier:res.data['data']})
        }
    },
    
    
}))

export default ProductStore