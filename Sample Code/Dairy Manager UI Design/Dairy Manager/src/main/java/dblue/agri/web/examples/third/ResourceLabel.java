package dblue.agri.web.examples.third;

import java.util.MissingResourceException;

import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.MarkupStream;
import org.apache.wicket.markup.html.basic.Label;

@SuppressWarnings("serial")
public class ResourceLabel extends Label {

  String key;

  public ResourceLabel(String id) {
    super(id);
    key = id;
  }

  public ResourceLabel(String id, String messageKey) {
    super(id, messageKey);
    key = messageKey;
  }

  @Override
  protected void onComponentTagBody(MarkupStream markupStream,
      ComponentTag openTag) {
    replaceComponentTagBody(markupStream, openTag, getMessage());
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
  private String getMessage() {
    String message = null;
    try {
      message = getLocalizer().getString(key, this);
    } catch (MissingResourceException e) {
      message = key;
    }
    return message;
  }

}
