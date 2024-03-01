package vttp.batch4.csf.ecommerce.controllers;


import java.io.IOException;
import java.io.StringReader;
import java.sql.SQLException;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping
@CrossOrigin
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path="/api/order")
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody String payload) {

    JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject json = reader.readObject();
		System.out.printf(">>> PAYLOAD: %s\n", json.toString());
    /* >>> PAYLOAD: 
    {"name":"timmmyyy",
    "address":"timmyyyy hse",
    "priority":false,
    "comments":"",
    "cart":{"lineItems":     
      [{"prodId":"65e1338024783764187625bb",
      "quantity":1,
      "name":"Eau De Toilette For Men",
      "price":5005},
      {"prodId":"65e1338024783764187625bb",
      "quantity":1,
      "name":"Eau De Toilette For Men","price":5005}]}} */


    JsonObject cartJson = json.getJsonObject("cart");
    System.out.println(">>>cartJson" +cartJson);
    JsonArray lineItems = cartJson.getJsonArray("lineItems");
    System.out.println(">>>lineItems Array: " +lineItems);
    
    Cart cartList = new Cart();
    List<LineItem> lineItemList = new LinkedList();


    for (int i=0; i<lineItems.size(); i++){
      JsonObject indiv = (JsonObject) lineItems.get(i);
      LineItem indivItem = new LineItem();
      indivItem.setProductId(indiv.getString("prodId"));
      indivItem.setName(indiv.getString("name"));
      indivItem.setQuantity(indiv.getInt("quantity"));
      indivItem.setPrice((float) indiv.getJsonNumber("price").doubleValue()); 
      
      lineItemList.add(indivItem); 
    }
    System.out.println(">>>>>"+lineItemList);

    cartList.setLineItems(lineItemList);

    Order order = new Order();
    order.setName(json.getString("name"));
    order.setAddress(json.getString("address"));
    order.setPriority(json.getBoolean("priority"));
    order.setComments(json.getString("comments"));
    order.setCart(cartList);

    System.out.println(">>>>>ORDER>>>>>"+ order);

    String orderId = "";
    try {
      poSvc.createNewPurchaseOrder(order);
      orderId = order.getOrderId();
      System.out.println("ORDER ID HELLO"+ orderId);
      JsonObject returnObj = Json.createObjectBuilder()
				.add("orderId", orderId)
				.build();

		return ResponseEntity.ok(returnObj.toString());

    } catch (Exception ex) {
      ex.printStackTrace();
          return ResponseEntity
              .status(400)
              .body("Error cannot save to MySql");
    }
  }
}
