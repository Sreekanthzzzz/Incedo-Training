package sre;
class Order extends shopifyapi{
	
	public void getOrders() {
		
		System.out.println("order:getOrders method ");
		
	}
}

class Product extends shopifyapi{
	
	public void getProducts() {
		
		System.out.println("Product:getproducts");
		
	}
}

class Fulfillment extends shopifyapi{
	
	public void sendFulfillments() {
		
		System.out.println("fulfillments:send method ");
		
	}
}

interface TransportInterface{
	
	public void send();
}

class ViaGuzzle implements TransportInterface{
	
	public void send() {
		
		System.out.println("ViaGuzzle:send");
		
	}
}

class ViaCurl implements TransportInterface{
	
	public void send() {
		
		System.out.println("viaCurl: send menthod");
		
	}
}

class ViaStream implements TransportInterface {
	
	public void send() {
		
		System.out.println("ViaStream:send method");
		
	}
}



public class shopifyapi implements TransportInterface {
	
	public void getShop() {
		
		System.out.println("shopifyapi:getShop method");
		
	}
	

	public static void main(String[] args) {
		
		System.out.println("shopifyapi:Main methos");
       
	}


	@Override
	public void send() {
		
		System.out.println("shopifyapi:send method");
		
	}

}
