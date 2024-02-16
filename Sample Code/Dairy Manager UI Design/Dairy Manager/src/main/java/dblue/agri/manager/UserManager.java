package dblue.agri.manager;

import java.util.Collection;

import dblue.agri.model.User;
import dblue.agri.model.UserRole;

/**
 * Interface of user manager.
 * 
 * @author rjansen
 */
public interface UserManager extends GenericEntityManager<User> {

  /**
   * Return the entity with the defined id.
   * 
   * @param username
   *          The username of the entity to fetch.
   * @return fetched entity with provided id.
   */
  User get(String username);

  /**
   * Get all user roles
   * 
   * @return the user roles
   */
  public Collection<UserRole> getAllRoles();
}
