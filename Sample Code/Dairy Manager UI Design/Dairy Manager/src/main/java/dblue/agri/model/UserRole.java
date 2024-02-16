package dblue.agri.model;

import java.io.Serializable;

/**
 * @author rjansen
 * 
 */
@SuppressWarnings("serial")
public class UserRole extends ParentModel implements Serializable {

  /** Role expression */
  private String role;

  /** Role description */
  private String description;

  /**
   * Default constructor
   */
  public UserRole() {
    super();
  }

  /**
   * Constructor for a user role
   * 
   * @param role
   *          the rolename itself
   */
  public UserRole(String role) {
    this.role = role;
  }

  /**
   * @return the role
   */
  public String getRole() {
    return role;
  }

  /**
   * @param role
   *          the role to set
   */
  public void setRole(String role) {
    this.role = role;
  }

  /**
   * @return the description
   */
  public String getDescription() {
    return description;
  }

  /**
   * @param description
   *          the description to set
   */
  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public void prePersist() {
  }

}
