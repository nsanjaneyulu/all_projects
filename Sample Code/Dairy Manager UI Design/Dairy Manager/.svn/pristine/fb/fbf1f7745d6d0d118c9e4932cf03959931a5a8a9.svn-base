package dblue.agri.model;

import java.io.Serializable;

import org.hibernate.proxy.HibernateProxyHelper;

/**
 * Base class for entity classes containing a Long id as the primary key.
 * 
 * This class was previously partly known as the EntityBase.
 * 
 * The Serializable marker interface is defined to be able to store entity
 * models. The Validatable interface is used to add model specific validations.
 * The concerning validate method must be implemented in the subclass. Used for
 * storing the active user as modifier of an entry in the database
 * 
 * @author rjansen
 * 
 */
@SuppressWarnings("serial")
public abstract class ParentModel implements Serializable {

  /**
   * The version of the entity.
   */
  private long version;

  /**
   * The primary key of the entity.
   */
  private Long id;

  /**
   * @return The id (primary key) of the entity.
   */
  public Long getId() {
    return id;
  }

  /**
   * @param id
   *          The id (primary key) to be set.
   */
  public void setId(Long id) {
    this.id = id;
  }

  /**
   * @return the version
   */
  public long getVersion() {
    return version;
  }

  /**
   * @param version
   *          the version to set
   */
  public void setVersion(long version) {
    this.version = version;
  }

  /*
   * (non-Javadoc)
   * 
   * @see java.lang.Object#hashCode()
   */
  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result
        + ((getId() == null) ? super.hashCode() : getId().hashCode());
    return result;
  }

  /*
   * (non-Javadoc)
   * 
   * @see java.lang.Object#equals(java.lang.Object)
   */
  @Override
  public boolean equals(Object obj) {
    // Check if reference to same object
    if (this == obj) {
      return true;
    }

    // Checks at object level
    if (obj == null) {
      return false;
    }

    // Check if object is of same class
    // Note: object to be compared can be a Hibernate proxy
    if (!getClass().equals(
        HibernateProxyHelper.getClassWithoutInitializingProxy(obj))) {
      return false;
    }

    // Check attributes of object
    final ParentModel other = (ParentModel) obj;

    // Check id attribute of object
    // Use getters, because otherwise the Hibernate proxy is not used!
    if (getId() != other.getId()) {
      if (getId() == null) {
        return false;
      }
      if (!getId().equals(other.getId())) {
        return false;
      }
    }

    // All attributes are the same, so objects are considered equal
    return true;
  }

  /**
   * Abstract method that is called just before the model is persisted (save or
   * update method). In this method you might want to update timestamps,
   * re-arrange the order of a collection or otherwise update or change some
   * values. This method is called before the validation.
   */
  public abstract void prePersist();
}
