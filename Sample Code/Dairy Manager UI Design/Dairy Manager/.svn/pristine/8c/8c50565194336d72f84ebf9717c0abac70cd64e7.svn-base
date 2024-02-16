package dblue.agri.web.dataprovider;

import java.util.Iterator;

import org.apache.wicket.extensions.markup.html.repeater.util.SortableDataProvider;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;

import dblue.agri.manager.GenericEntityManager;
import dblue.agri.model.ParentModel;

@SuppressWarnings("serial")
public abstract class ParentModelDataProvider<T extends ParentModel> extends
    SortableDataProvider<T> {

  public Iterator<? extends T> iterator(int first, int count) {
    return getManager().getAll().iterator();
  }

  public int size() {
    return getManager().getAll().size();
  }

  public IModel<T> model(T object) {
    return new Model<T>(object);
  }

  /**
   * The manager for retrieving the entity values
   * 
   * @return the manager
   */
  protected abstract GenericEntityManager<T> getManager();

}
