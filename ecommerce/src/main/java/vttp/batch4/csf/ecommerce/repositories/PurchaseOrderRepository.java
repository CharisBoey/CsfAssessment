package vttp.batch4.csf.ecommerce.repositories;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  public static final String SQL_INSERT_ORDER = """
      insert into orderinput(orderId, date, name, address, priority, comments)
      values (?, ?, ?, ?, ?, ?)
      
   """;

   public static final String SQL_INSERT_CART = """
      insert into cartlineitems(productId, orderId, name, quantity, price)
      values (?, ?, ?, ?, ?)
      
  """;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3 , order.getCart()
    
    Cart cart = order.getCart();
    List<LineItem> liList = cart.getLineItems();

    template.update(SQL_INSERT_ORDER, order.getOrderId(), order.getDate(), order.getName(), order.getAddress(), order.getPriority(), order.getComments());
    
    for (LineItem lineItem : liList) {
      template.update(SQL_INSERT_CART, lineItem.getProductId(), order.getOrderId(), lineItem.getName(), lineItem.getQuantity(), lineItem.getPrice());
    }

  }
}
