export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },

  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: " Title",
    name: "title",
    componentType: "input",
    placeholder: "Enter product title",
    type: "text",
    required: true,
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
    required: true,
  },

  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men", value: "" },
      { id: "women", label: "Women", value: "" },
      { id: "kids", label: "Kids", value: "" },
      { id: "accessories", label: "Accessories", value: "" },
      { id: "footer", label: " Footer", value: "" },
      { id: "electronics", label: "Electronics", value: "" },
    ],
    placeholder: "Select product category",
    required: true,
  },

  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levvi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },

      // Add more brands as needed
    ],
    placeholder: "Select product brand",
    required: true,
  },

  {
    label: "Price",
    name: "price",
    componentType: "input",
    placeholder: "Enter product price",
    type: "number",
    required: true,
  },

  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    placeholder: "Enter sale price (if applicable)",
    type: "number",
  },

  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    placeholder: "Enter total stock quantity",
    type: "number",
    required: true,
  },
];

export const shopppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "electronics",
    label: "Electronics",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  electronics: "Electronics",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levvi's",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "electronics", label: "Electronics" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levvi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    placeholder: "Enter your address",
    type: "text",
    // required: true,
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    placeholder: "Enter your city",
    type: "text",
    // required: true,
  },
  {
    label: "PinCode",
    name: "pinCode",
    componentType: "input",
    placeholder: "Enter your Pincode",
    type: "text",
    // required: true,
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    placeholder: "Enter your phone number",
    type: "text",
    // required: true,
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
    type: "text",
  },
];
