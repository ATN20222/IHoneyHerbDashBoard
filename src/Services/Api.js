import axios from 'axios';

const BASE_URL = 'https://ihoneyherb.com/admin-test'; 

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
    throw new Error('Faild to get product'); 
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
    throw new Error('Faild to get product'); 
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
    throw new Error('Faild to remove option'); 
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






