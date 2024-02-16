package dblue.agri.dao;

import java.util.Collection;

import dblue.agri.model.ParentModel;

/**
 * Generic interface for the entity DAO classes. This interface defines all the
 * generic methods supported by the different entity DAOs.
 * 
 * @param <T>
 *          is the type of the entity that needs to be managed by the DAO.
 * 
 * @author rjansen
 */
public interface GenericEntityDao<T extends ParentModel> {

  /**
   * return all available entities of this type
   * 
   * @return all the available entities.
   */
  Collection<T> getAll();

  /**
   * Return the entity with the defined id.
   * 
   * @param id
   *          The id of the entity to fetch.
   * @return fetched entity with provided id.
   */
  T get(Long id);

  /**
   * Save (create) the data of the entity. The id of the entity is generated
   * automatically.
   * 
   * @param item
   *          The entity to be saved.
   */
  void save(T item);

  /**
   * Update the data of the entity.
   * 
   * @param item
   *          The entity to be updated.
   */
  void update(T item);

  /**
   * Delete the data of the entity.
   * 
   * @param item
   *          The entity to be deleted.
   */
  void delete(T item);

  /**
   * Evict the given item from the hibernate cache.
   * 
   * @param item
   *          the item to evict
   */
  void evictFromHibernate(T item);

}
