import axios from 'axios';

const BASE_URL = 'https://ihoneyherb.com/admin-test/'; 

//#region Login Api's
export const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(`${BASE_URL}/login.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Login failed'); 
  }
};
//#endregion 

//#region Category Api's
export const addCategory = async (auth_key, user_id, cat_name_en, cat_name_ar, parent_id, cat_icon) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('cat_name_en', cat_name_en);
    formData.append('cat_name_ar', cat_name_ar);
    formData.append('parent_id', parent_id);
    formData.append('cat_icon', cat_icon);

    const response = await axios.post(`${BASE_URL}/categories/add.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add category'); 
  }
};
export const editCategory = async (auth_key, user_id,cat_id ,cat_name_en, cat_name_ar, parent_id, cat_icon) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('cat_name_en', cat_name_en);
    formData.append('cat_name_ar', cat_name_ar);
    formData.append('cat_id', cat_id);
    formData.append('parent_id', parent_id);
    if(cat_icon !=null){

      formData.append('cat_icon', cat_icon);
    }

    const response = await axios.post(`${BASE_URL}/categories/edit.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add category'); 
  }
};

export const ListCategories = async (auth_key, user_id) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);

    const response = await axios.post(`${BASE_URL}/categories/list.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('List filed'); 
  }
};


//#endregion

//#region Variations Api's

export const listVariation = async (auth_key, user_id) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);


    const response = await axios.post(`${BASE_URL}/variations/list.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add category'); 
  }
};


export const editVariation = async (auth_key, user_id , record_id , name_en ,name_ar) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('record_id', record_id);
    formData.append('name_en', name_en);
    formData.append('name_ar', name_ar);
    // formData.append('user_id', user_id);

    const response = await axios.post(`${BASE_URL}/variations/edit.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add category'); 
  }
};
export const addVariation = async (auth_key, user_id,name_en, name_ar) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    // formData.append('user_id', user_id);
    formData.append('name_en', name_en);
    formData.append('name_ar', name_ar);


    const response = await axios.post(`${BASE_URL}/variations/add.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add category'); 
  }
};

//#endregion




//#region Product Api's
 export const SearchProduct = async(auth_key , user_id , keyword)=>{
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('keyword', keyword);



    const response = await axios.post(`${BASE_URL}/products/search.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed'); 
  }
}

export const DeleteProductImage = async(auth_key , user_id , image_id)=>{
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('image_id', image_id);



    const response = await axios.post(`${BASE_URL}/products/delete_photo.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed'); 
  }
}
export const EditProductMainImage = async(auth_key , user_id , product_id , main_image)=>{
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('main_image', main_image);
    formData.append('product_id', product_id);



    const response = await axios.post(`${BASE_URL}/products/edit_photo.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed'); 
  }
}
export const listProducts = async (auth_key, user_id , limit , count) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('limit', limit);
    formData.append('count', count);


    const response = await axios.post(`${BASE_URL}/products/list.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to list Products'); 
  }
};

export const uploadImage = async ( image ) => {
  try {
    const formData = new FormData();
    formData.append('image', image);


    const response = await axios.post(`${BASE_URL}/products/upload_image.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to upload Image'); 
  }
};

export const addProduct = 
    async (auth_key, user_id ,
          name_en , name_ar ,
          short_desc_en ,short_desc_ar,
          description_en , description_ar,
          category_id,main_image,
          sku,list_price,
          sale_price , barcode ,quantity,group_id
          ) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('name_en', name_en);
    formData.append('name_ar', name_ar);
    formData.append('short_desc_en', short_desc_en);
    formData.append('short_desc_ar', short_desc_ar);
    formData.append('description_en', description_en);
    formData.append('description_ar', description_ar);
    formData.append('category_id', category_id);
    formData.append('main_image', main_image);
    formData.append('sku', sku);
    formData.append('list_price', list_price);
    formData.append('sale_price', sale_price);
    formData.append('barcode', barcode);
    formData.append('quantity', quantity);
    formData.append('group_id', group_id);


    const response = await axios.post(`${BASE_URL}/products/add.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add Product'); 
  }
};


export const AddOption = async ( auth_key,product_id , variation_id,value_en , value_ar ) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('product_id', product_id);
    formData.append('variation_id', variation_id);
    formData.append('value_en', value_en);
    formData.append('value_ar', value_ar);


    const response = await axios.post(`${BASE_URL}/products/variations/add_option.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add option'); 
  }
};

export const AssignProduct = async ( auth_key,product_id , option_id) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('product_id', product_id);
    formData.append('option_id', option_id);


    const response = await axios.post(`${BASE_URL}/products/variations/assign_product.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add option'); 
  }
};


export const EditProduct = 
    async (auth_key, user_id ,record_id,
          name_en , name_ar ,
          short_desc_en ,short_desc_ar,
          description_en , description_ar,
          category_id,main_image,
          sku,list_price,
          sale_price , barcode,
          quantity,group_id
          ) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('record_id', record_id);
    formData.append('name_en', name_en);
    formData.append('name_ar', name_ar);
    formData.append('short_desc_en', short_desc_en);
    formData.append('short_desc_ar', short_desc_ar);
    formData.append('description_en', description_en);
    formData.append('description_ar', description_ar);
    formData.append('category_id', category_id);


    if(main_image !=null){

      formData.append('main_image', main_image);
    }

    formData.append('sku', sku);
    formData.append('list_price', list_price);
    formData.append('sale_price', sale_price);
    formData.append('barcode', barcode);
    formData.append('quantity', quantity);
    formData.append('group_id', group_id);


    const response = await axios.post(`${BASE_URL}/products/edit.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to list Products'); 
  }
};

export const ProductDetails = async (auth_key, product_id) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('product_id', product_id);



    const response = await axios.post(`${BASE_URL}/products/view.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to get product'); 
  }
};

export const AddPhotos = async (auth_key, product_id,image_name) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('image_name', image_name);
    formData.append('product_id', product_id);



    const response = await axios.post(`${BASE_URL}/products/add_photo.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to get product'); 
  }
};

export const RemoveOption = async (auth_key, product_id , option_id) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('product_id', product_id);
    formData.append('option_id', option_id);



    const response = await axios.post(`${BASE_URL}/products/variations/delete.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to remove option'); 
  }
};

export const TestCats = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/categories/dropdown.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list Products'); 
    }
};

export const RemoveGroup = async (auth_key, user_id , group_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('group_id', group_id);


      const response = await axios.post(`${BASE_URL}/groups/delete.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to remove group'); 
    }
};

export const RemoveProduct = async (auth_key, user_id , product_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('product_id', product_id);


      const response = await axios.post(`${BASE_URL}/products/hide.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to remove product'); 
    }
};
export const RemoveCategory = async (auth_key, user_id , category_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('category_id', category_id);


      const response = await axios.post(`${BASE_URL}/categories/hide.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to remove category'); 
    }
};


//#endregion




//#region Groups Api's

export const ListGroups = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/groups/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list groups'); 
    }
};

export const DropDown = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/groups/dropdown.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list groups'); 
    }
};

export const AddGroup = async (auth_key, user_id, group_name_en, group_name_ar, parent_id, group_icon) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('group_name_en', group_name_en);
    formData.append('group_name_ar', group_name_ar);
    formData.append('parent_id', parent_id);
    formData.append('group_icon', group_icon);

    const response = await axios.post(`${BASE_URL}/groups/add.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add group'); 
  }
};

export const EditGroups = async (auth_key, user_id,group_id, group_name_en, group_name_ar, parent_id, group_icon) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('group_id', group_id);
    formData.append('group_name_en', group_name_en);
    formData.append('group_name_ar', group_name_ar);
    formData.append('parent_id', parent_id);

    if(group_icon !=null){
      formData.append('group_icon', group_icon);
    }

    const response = await axios.post(`${BASE_URL}/groups/edit.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to edit group'); 
  }
};
//#endregion




// #region WellnessQuiz Api's

export const ListQuestions = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/wellness_quiz/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list questions'); 
    }
};
export const DeleteWellnessQuestion = async (auth_key, user_id,q_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('q_id', q_id);


      const response = await axios.post(`${BASE_URL}/wellness_quiz/delete.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to delete question'); 
    }
};

export const ListAges = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);



      const response = await axios.post(`${BASE_URL}/wellness_quiz/ages_dropdown.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to load data'); 
    }
};
export const QuestionById = async (auth_key, user_id , q_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('q_id', q_id);



      const response = await axios.post(`${BASE_URL}/wellness_quiz/view.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to load data'); 
    }
};

export const AddWellnessQuestion = async (auth_key, user_id , question_en , question_ar , gender , age, image) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('question_en', question_en);
      formData.append('question_ar', question_ar);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('image', image);



      const response = await axios.post(`${BASE_URL}/wellness_quiz/add.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to add question'); 
    }
};
export const EditWellnessQuestion = async (auth_key, user_id, q_id, question_en , question_ar , gender , age, image) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('q_id', q_id);
      formData.append('question_en', question_en);
      formData.append('question_ar', question_ar);
      formData.append('gender', gender);
      formData.append('age', age);
      if(image != null){

        formData.append('image', image);
      }



      const response = await axios.post(`${BASE_URL}/wellness_quiz/edit.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to edit question'); 
    }
};
export const WellnessQuestionProducts = async (auth_key, user_id , q_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('q_id', q_id);



      const response = await axios.post(`${BASE_URL}/wellness_quiz/list_products.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to load data'); 
    }
};
export const AssignQuestionProduct = async (auth_key, user_id , q_id ,product_id ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('q_id', q_id);
      formData.append('product_id', product_id);



      const response = await axios.post(`${BASE_URL}/wellness_quiz/assign_product.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to load data'); 
    }
};
export const RemoveAssignQuestionProduct = async (auth_key, user_id , q_id ,product_id ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('q_id', q_id);
      formData.append('product_id', product_id);



      const response = await axios.post(`${BASE_URL}/wellness_quiz/delete_product.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to load data'); 
    }
};


//#endregion

//#region Intro Screens 
export const ListScreens = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/intro_screens/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list screens'); 
    }
};

export const AddAppScreen = async (auth_key, user_id , title_en ,title_ar , desc_en , desc_ar , photo ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('title_en', title_en);
      formData.append('title_ar', title_ar);
      formData.append('desc_en', desc_en);
      formData.append('desc_ar', desc_ar);
      formData.append('photo', photo);


      const response = await axios.post(`${BASE_URL}/intro_screens/add.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to add screen'); 
    }
};

export const DeleteAppScreen = async (auth_key, user_id , intro_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('intro_id', intro_id);


      const response = await axios.post(`${BASE_URL}/intro_screens/delete.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to delete screen'); 
    }
};
//#endregion

// #region Coupons Api's
export const ListCoupons = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/coupons/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list Coupons'); 
    }
};

export const AddCoupons = async (auth_key, user_id,coupon, discount , status , expiry_date) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('coupon', coupon);
    formData.append('discount', discount);
    formData.append('is_active', status);
    formData.append('expiry_date', expiry_date);


    const response = await axios.post(`${BASE_URL}/coupons/add.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add coupon'); 
  }
};
export const EditCoupons = async (auth_key, user_id,coupon_id,coupon, discount , status , expiry_date) => {
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('coupon_id', coupon_id);
    formData.append('coupon', coupon);
    formData.append('discount', discount);
    formData.append('is_active', status);
    formData.append('expiry_date', expiry_date);


    const response = await axios.post(`${BASE_URL}/coupons/edit.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to add coupon'); 
  }
};
// #endregion


//#region Users Api's
export const ListUsers = async (auth_key, user_id ,count , limit) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('count', count);
      formData.append('limit', limit);


      const response = await axios.post(`${BASE_URL}/users/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list Users'); 
    }
};
export const EditUsers = async (auth_key, user_id,email, active ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('email', email);
      formData.append('active', active);


      const response = await axios.post(`${BASE_URL}/users/edit.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
export const SearchUser = async(auth_key , user_id , keyword)=>{
  try {
    const formData = new FormData();
    formData.append('auth_key', auth_key);
    formData.append('user_id', user_id);
    formData.append('keyword', keyword);



    const response = await axios.post(`${BASE_URL}/users/search.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed'); 
  }
}
//#endregoin

//#region Reviews Api's
export const ListReviews = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/reviews/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list Users'); 
    }
};
export const EditReviews = async (auth_key, user_id,id, active ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('id', id);
      formData.append('active', active);


      const response = await axios.post(`${BASE_URL}/reviews/edit.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to show/hide review'); 
    }
};
//#endregion


//#region Notifications Api's
export const ListNotifications = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/notifications/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list notifications'); 
    }
};
export const AddNotifications = async (auth_key, user_id, title_en , title_ar, body_en,body_ar ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', '0');
      formData.append('title_en', title_en);
      formData.append('title_ar', title_ar);
      formData.append('body_en', body_en);
      formData.append('body_ar', body_ar);


      const response = await axios.post(`${BASE_URL}/notifications/add.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to send notification'); 
    }
};
//#endregion


//#region Orders Api's
export const ListOrders = async (auth_key, user_id,status_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('status_id', status_id);


      const response = await axios.post(`${BASE_URL}/orders/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list orders'); 
    }
};
export const OrderById = async (auth_key, user_id , order_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('order_id', order_id);


      const response = await axios.post(`${BASE_URL}/orders/order_details.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to get order'); 
    }
};
export const ListOrderStatus = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/orders/list_status.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list status'); 
    }
};
export const EditOrder = async (auth_key, user_id, order_id , order_status, arrival_date) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('order_id', order_id);
      formData.append('order_status', order_status);
      formData.append('arrival_date', arrival_date);

      const response = await axios.post(`${BASE_URL}/orders/update_order_data.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to send notification'); 
    }
};

export const ListReturnedItems = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/orders/return_order_request.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list items'); 
    }
};
export const UpdateItemStatus = async (auth_key, user_id ,order_id , id , status) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('order_id', order_id);
      formData.append('id', id);
      formData.append('status', status);


      const response = await axios.post(`${BASE_URL}/orders/update_items_status.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to edit status'); 
    }
};

//#endregion

//#region Home Api's
export const ListActivities = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/reports/users_activity.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};

export const ListOrdersStatus = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/reports/orders_status.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};

export const ListProducts = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/reports/categories_products.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};

export const ListCategoriesOrders = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/reports/orders_categories.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
//#endregion

//#region WebsiteSlide Api's
export const ListSlides = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/slider/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
export const AddSlides = async (auth_key, user_id , product_id , image_en,image_ar) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('product_id', product_id);
      formData.append('image_en', image_en);
      formData.append('image_ar', image_ar);



      const response = await axios.post(`${BASE_URL}/slider/add.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
export const DeleteSlides = async (auth_key, user_id , slider_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('slider_id', slider_id);



      const response = await axios.post(`${BASE_URL}/slider/delete.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
//#endregion

// #region FAQ
export const ListFaq = async (auth_key, user_id) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);


      const response = await axios.post(`${BASE_URL}/FAQ/list.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
export const AddFaq = async (auth_key, user_id ,question_en , question_ar , answer_en , answer_ar ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('question_en', question_en);
      formData.append('question_ar', question_ar);
      formData.append('answer_en', answer_en);
      formData.append('answer_ar', answer_ar);


      const response = await axios.post(`${BASE_URL}/FAQ/add.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
export const DeleteFaq = async (auth_key, user_id ,id ) => {
  try {
      const formData = new FormData();
      formData.append('auth_key', auth_key);
      formData.append('user_id', user_id);
      formData.append('id', id);


      const response = await axios.post(`${BASE_URL}/FAQ/delete.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed'); 
    }
};
// #endregion