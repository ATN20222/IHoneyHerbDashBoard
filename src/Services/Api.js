import axios from 'axios';

const BASE_URL = 'https://admin.ihoneyherb.com'; 


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
    formData.append('cat_icon', cat_icon);

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

export const addProduct = async (auth_key, user_id ,
          name_en , name_ar ,
          short_desc_en ,short_desc_ar,
          description_en , description_ar,
          category_id,main_image,
          sku,list_price,
          sale_price , barcode
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


    const response = await axios.post(`${BASE_URL}/products/add.php`, formData);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to list Products'); 
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


export const EditProduct = async (auth_key, user_id ,record_id,
          name_en , name_ar ,
          short_desc_en ,short_desc_ar,
          description_en , description_ar,
          category_id,main_image,
          sku,list_price,
          sale_price , barcode
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
    if(main_image != null){

      formData.append('main_image', main_image);
    }
    formData.append('sku', sku);
    formData.append('list_price', list_price);
    formData.append('sale_price', sale_price);
    formData.append('barcode', barcode);


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


      const response = await axios.post(`https://ihoneyherb.com/app/products/cat-test.php`, formData);
    return response.data; 
    } catch (error) {
      throw new Error('Failed to list Products'); 
    }
};

//#endregion















