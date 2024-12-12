var ProductName=document.getElementById("ProductName");
var ProductPrice=document.getElementById("ProductPrice");
var ProductCate=document.getElementById("ProductCate");
var ProductDesc=document.getElementById("ProductDesc");
var mainBtn=document.getElementById("mainBtn");
var Update
var inCase = 'create';
var ProductList=[]

if (localStorage.getItem("List")!=null) {
    ProductList=JSON.parse(localStorage.getItem("List"));
    displayProduct();
}else{
    ProductList=[]
}

// Function addProduct
function addProduct(){
        var Product={
            name:ProductName.value,
            price:ProductPrice.value,
            cate:ProductCate.value,
            desc:ProductDesc.value,
        };
        clearProduct();
    
    if (inCase === 'create'){
    ProductList.push(Product);
    displayProduct();
    localStorage.setItem("List",JSON.stringify(ProductList))
    
    }
    else{
    ProductList[Update]=Product
    displayProduct();
    mainBtn.innerText='Add Product'
    inCase = 'create'
    displayProduct();
    localStorage.setItem("List",JSON.stringify(ProductList))
    
    }
       
   
            
}

// Function displayProduct
function displayProduct() {
    cartoona=``;
    for (var i = 0; i < ProductList.length; i++) {
        cartoona+=` <tr>
                <td>${i+1}</td>
                <td>${ProductList[i].name}</td>
                <td>${ProductList[i].price}</td>
                <td>${ProductList[i].cate}</td>
                <td>${ProductList[i].desc}</td>
                <td><button onclick="UpdateProduct(${i})" class=" btn btn-outline-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>

            </tr>`
    }
    document.getElementById("Tbody").innerHTML=cartoona;
}

// Function clearProduct
function clearProduct() {
    ProductName.value="";
    ProductPrice.value="";
    ProductCate.value="";
    ProductDesc.value="";
}

// Function deleteProduct
function deleteProduct(index) {
    ProductList.splice(index,1);
    displayProduct();
    localStorage.setItem("List",JSON.stringify(ProductList))

}

// Function UpdateProduct
function UpdateProduct(index) {
    ProductName.value=ProductList[index].name;
    ProductPrice.value= ProductList[index].price;
    ProductCate.value=ProductList[index].cate;
    ProductDesc.value=ProductList[index].desc ;
    mainBtn.innerText="UpdateProduct";
    Update=index;
    inCase = 'update'


}
// Function Search
function searchProduct(item) {
    cartoona=``;
    for (var i = 0; i < ProductList.length; i++) {
        if (ProductList[i].name.toLowerCase().includes(item.toLowerCase())==true) {
            ProductList[i].newName=ProductList[i].name.replace(item,`<span class=" text-danger fw-bolder">${item}</span>`)
        cartoona+=` <tr>
                <td>${i+1}</td>
                <td>${ProductList[i].newName?ProductList[i].newName:ProductList[i].name}</td>
                <td>${ProductList[i].price}</td>
                <td>${ProductList[i].cate}</td>
                <td>${ProductList[i].desc}</td>
                <td><button onclick="UpdateProduct(${i})" class=" btn btn-outline-warning">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class=" btn btn-outline-danger">Delete</button></td>

            </tr>`
        }
    }
    document.getElementById("Tbody").innerHTML=cartoona;

}
// Function validateProductName
function validationProductName() {
    var regex=/^[A-Z][a-z]{3,8}$/
    if (regex.test(ProductName.value)) {
        document.getElementById('nameError').classList.add('d-none');
    }else{
        document.getElementById('nameError').classList.remove('d-none');

    }
}

// Function validateProductPrice
function validationProductPrice() {
    var regex=/^[0-9]{2,6}$/
    if (regex.test(ProductPrice.value)) {
        document.getElementById('priceError').classList.add('d-none');
    }else{
        document.getElementById('priceError').classList.remove('d-none');

    }
}