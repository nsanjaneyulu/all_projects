package dblue.agri.web.examples.second;

import java.util.MissingResourceException;

import org.apache.wicket.Component;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.Model;

/**
 * Parent class for a generic page in our application
 * 
 * @author rjansen
 * 
 */
public abstract class AbstractParentPage extends WebPage {

  @SuppressWarnings("serial")
  public AbstractParentPage() {
    add(new Label("header", getMessage("page.header", AbstractParentPage.this)));

    Model<String> subHeaderModel = new Model<String>() {
      @Override
      public String getObject() {
        return getMessage("page.subheader", AbstractParentPage.this);
      }
    };

    Label label = new Label("subHeader", subHeaderModel);
    add(label);

  }

  /**
   * Get a message for the given component with the given key. If a message is
   * not found in the property files, then the key is returned.
   * 
   * @param component
   *          the component to use to find the message
   * @param key
   *          the message key
   * @return the message for the given key (or the key if the resource is not
   *         available)
   */
  public String getMessage(final String key, final Component component) {
    String message = null;
    try {
      message = component.getLocalizer().getString(key, component);
    } catch (MissingResourceException e) {
      message = key;
    }
    return message;
  }
}
