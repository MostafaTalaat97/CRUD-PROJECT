

    let productName = document.getElementById('ProductName');
    let ProductPrice = document.getElementById("ProductPrice");
    let productCategory = document.getElementById('productCategory')
    let productImage = document.getElementById('productImage')
    let searchInput = document.getElementById('searchInput');
    let updatedIndex ;
    var productList = [];

    let addBtn = document.getElementById('addBtn');
    let updateBtn = document.getElementById('updateBtn');

    

   // check the local storage impty or not 
    if(localStorage.getItem('product') != null){
        productList = JSON.parse(localStorage.getItem('product'));
        displayProduct(productList);
    }

/// add product
    function addProduct(){
        let product = {
            title:productName.value,
            price:ProductPrice.value,
            category:productCategory.value,
            image:`image/${productImage.files[0]?.name}`,
        }
        productList.push(product);

        clearFrom()

        displayProduct(productList)

        localStorage.setItem('product',JSON.stringify(productList));

    }
    //clear form
    function clearFrom(){
        productName.value=null;
        ProductPrice.value=null;
        productCategory.value=null;
        productImage.value=null;

        productName.classList.remove('is-valid');
        productCategory.classList.remove('is-valid');
        ProductPrice.classList.remove('is-valid');
    }
    // display product
    function displayProduct(arr){

        let boxProduct = ``;

        for(i=0;i<arr.length;i++){
            boxProduct += `
            <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="product p-2 mb-4">
                        <img src="${arr[i].image}" alt="product" class="w-100 d-block mx-auto mb-2">
                        <h2 class=" text-capitalize"><span class="fs-6 me-2 w-25 d-inline-block">product Name</span>: ${arr[i].title}</h2>
                        <h3 class=""><span class="fs-6 me-2 w-25 d-inline-block text-capitalize">price </span>: ${arr[i].price}</h3>
                        <h3 class=""><span class="fs-6 me-2 w-25 d-inline-block text-capitalize">categoty </span>: ${arr[i].category}</h3>
                        <button onclick="deleteProduct(${i})" class="btn btn-outline-dark btn-sm w-100 text-capitalize mb-3">delete</button>
                        <button onclick="setFormForUpdate(${i})" class="btn btn-outline-info btn-sm w-100 text-capitalize">update</button>
                    </div><!-- ./product -->
                </div><!-- ./col -->
            `

        }

        document.getElementById('rowData').innerHTML=boxProduct;
    }
    // delete function

    function deleteProduct(deletIndex){

        productList.splice(deletIndex,1);

        displayProduct(productList);

        localStorage.setItem('product',JSON.stringify(productList))
     }

     // search function
    function searchProduct(){
        let searchWords = searchInput.value;
        let searchBox = [];
        for(i=0;i<productList.length;i++){
            if(productList[i].title.toLowerCase().includes(searchWords.toLowerCase())){
                searchBox = productList[i];
            }
        }
        displayProduct(searchBox);


    }


    /// read for update function
    function setFormForUpdate(i){
        updatedIndex = i;

        addBtn.classList.add('d-none');
        updateBtn.classList.remove('d-none');

        productName.value = productList[i].title;
        ProductPrice.value = productList[i].price;
        productCategory.value = productList[i].category;


    }
    /// update
    function updateProduct(){
        
        addBtn.classList.remove('d-none');
        updateBtn.classList.add('d-none');

        productList[updatedIndex].title=productName.value;
        productList[updatedIndex].price=ProductPrice.value;
        productList[updatedIndex].category=productCategory.value;
        productList[updatedIndex].imgae=`image${productImage.files[0].name}`
       

        displayProduct(productList);
        localStorage.setItem('product',JSON.stringify(productList));


        clearFrom()
    }

function validateInpute(element){

    let regex = {
        ProductName:/^[A-Z][a-zA-Z]{1,9}$/,
        ProductPrice:/^[0-9]{1,6}/,
        productCategory:/(mobile|t.v|phone)/
    }
    


    if(regex[element.id].test(element.value) == true){
      
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.replace('d-block','d-none'); 
        
        return true;

    }else{
        
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        element.nextElementSibling.classList.replace('d-none','d-block');

        return false;

    }
}

