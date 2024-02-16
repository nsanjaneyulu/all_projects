package dblue.agri.manager.impl;

import java.util.Collection;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import dblue.agri.dao.GenericEntityDao;
import dblue.agri.manager.GenericEntityManager;
import dblue.agri.model.ParentModel;

/**
 * Implementation of the generic entity manager (service layer)
 * 
 * @author rjansen
 */
public class GenericEntityManagerImpl<T extends ParentModel> implements
    GenericEntityManager<T> {

  /** the logger */
  private static final Log LOG = LogFactory
      .getLog(GenericEntityManagerImpl.class);

  /** DAO for manage entities */
  private GenericEntityDao<T> entityDao;

  /**
   * Set the DAO to use
   * 
   * @param entityDao
   *          The DAO to use
   */
  public void setEntityDao(GenericEntityDao<T> entityDao) {
    this.entityDao = entityDao;
  }

  public void delete(T entity) {
    logMessage("Delete", entity);
    entityDao.delete(entity);
  }

  public T get(Long id) {
    return entityDao.get(id);
  }

  public Collection<T> getAll() {
    return entityDao.getAll();
  }

  public void save(T entity) {
    logMessage("Save", entity);
    entityDao.save(entity);
  }

  public void update(T entity) {
    logMessage("Update", entity);
    entityDao.update(entity);
  }

  public void evictFromHibernate(T item) {
    entityDao.evictFromHibernate(item);
  }

  /**
   * Log the called method
   * 
   * @param method
   *          the called method
   * @param item
   *          the item used in the method (if available)
   */
  private void logMessage(String method, T item) {
    if (LOG.isInfoEnabled()) {
      Long recordId = null;
      if (item != null) {
        recordId = item.getId();
      }
      LOG.info(method + " method called for manager "
          + this.getClass().getName() + " for record "
          + (recordId != null ? recordId.longValue() : "\"new\""));
    }
  }
}
