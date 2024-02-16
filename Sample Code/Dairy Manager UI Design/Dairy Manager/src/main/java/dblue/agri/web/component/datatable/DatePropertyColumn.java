package dblue.agri.web.component.datatable;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.wicket.extensions.markup.html.repeater.data.grid.ICellPopulator;
import org.apache.wicket.extensions.markup.html.repeater.data.table.PropertyColumn;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.model.IModel;
import org.apache.wicket.util.lang.PropertyResolver;

/**
 * Extention of the Wicket {@link PropertyColumn} used in a datatable.
 * 
 * Will show the date in the given format
 * 
 * @author rjansen
 * 
 */
@SuppressWarnings("serial")
public class DatePropertyColumn<T> extends PropertyColumn<T> {
  private static Log log = LogFactory.getLog(DatePropertyColumn.class);

  /** Format the date */
  private SimpleDateFormat formatter = null;

  /**
   * Constructor
   * 
   * @param displayModel
   *          the display model
   * @param propertyExpression
   *          wicket property expression used by PropertyModel
   * @param propertyExpression
   *          wicket property expression used by PropertyModel
   * @param dateFormat
   *          the component to use for lookup of properties file
   */
  public DatePropertyColumn(IModel<String> displayModel, String sortProperty,
      String propertyExpression, String dateFormat) {
    super(displayModel, sortProperty, propertyExpression);
    formatter = new SimpleDateFormat(dateFormat);
  }

  /**
   * Constructor
   * 
   * @param displayModel
   *          the display model
   * @param propertyExpression
   *          wicket property expression used by PropertyModel
   * @param propertyExpression
   *          wicket property expression used by PropertyModel
   */
  public DatePropertyColumn(IModel<String> displayModel, String sortProperty,
      String propertyExpression) {
    this(displayModel, sortProperty, propertyExpression, "dd-MM-yyyy");
  }

  @Override
  public void populateItem(Item<ICellPopulator<T>> item, String componentId,
      IModel<T> model) {
    // First get the toString() value of the property in the given model
    Object object = PropertyResolver.getValue(getPropertyExpression(),
        model.getObject());

    if (log.isDebugEnabled()) {
      log.debug("Populating after resolver: " + object);
    }
    String value = "";
    if (object != null && object instanceof Date) {
      Date date = (Date) object;
      value = formatter.format(date); // now try to resolve the value in
      // the properties file

      if (log.isDebugEnabled()) {
        log.debug("Result of all the formatting: " + value);
      }
    }
    item.add(new Label(componentId, value));
  }

}
