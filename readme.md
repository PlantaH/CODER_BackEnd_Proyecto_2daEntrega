# **API DESCRIPTION**

# PRODUCTOS


method: POST 
    http://localhost:8080/products ---> Alta
    {
        "nombre" : "guitarra",
        "descripcion" : "6 cuerdas",
        "codigo": "123",
        "precio": 200,
        "stock": 1,
        "thumb" : "url de la foto"
    }

method: GET
    http://localhost:8080/products/ ---> Lista todos los productos

    http://localhost:8080/products/1 ---> Lista por id 

method: DELETE
    http://localhost:8080/products/1 ---> Elimina un producto por id

method: PUT 
    http://localhost:8080/products/1 ---> Modifica un item por id 
    {
        "nombre" : "guitarra",
        "descripcion" : "6 cuerdas",
        "codigo": "123",
        "precio": 200,
        "stock": 1,
        "thumb" : "url de la foto"
    }


# CARRITO


method : POST
http://localhost:8080/carts/  ---> crea un carrito

method : POST
http://localhost:8080/carts/${carritoID}/products     ---> agrega items a un carrito
    {
        "id" : 1         
    }

method : GET
http://localhost:8080/carts/${carritoID}/products ---> Lista todos los productos de un carrito

method: DELETE
    http://localhost:8080/carts/${carritoID} ---> Elimina un carrito por id

method: DELETE
    http://localhost:8080/carts/${carritoID}/products/${code} ---> Elimina un carrito por codigo de producto 
