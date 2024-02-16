package dblue.agri.manager;

import java.util.Collection;

import dblue.agri.model.ParentModel;

/**
 * The GenericEntityManager is used to manage the entities in the database.
 * (service layer)
 * 
 * @author rjansen
 */
public interface GenericEntityManager<T extends ParentModel> {

  Collection<T> getAll();

  T get(Long id);

  void save(T item);

  void update(T item);

  void delete(T item);

  void evictFromHibernate(T item);

}
