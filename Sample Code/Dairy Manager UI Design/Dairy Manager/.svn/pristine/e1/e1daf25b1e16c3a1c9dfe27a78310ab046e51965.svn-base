package dblue.agri.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author rjansen
 * 
 */
@SuppressWarnings("serial")
public class User extends ParentModel implements Serializable {

  private String username;

  private String password;

  private String description;

  private Date dateOfBirth;

  private Set<UserRole> roles;

  /**
   * The default constructor
   */
  public User() {
    super();
    this.roles = new HashSet<UserRole>();
  }

  /**
   * @return the username
   */
  public String getUsername() {
    return username;
  }

  /**
   * @param username
   *          the username to set
   */
  public void setUsername(String username) {
    this.username = username;
  }

  /**
   * @return the password
   */
  public String getPassword() {
    return password;
  }

  /**
   * @param password
   *          the password to set
   */
  public void setPassword(String password) {
    this.password = password;
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

  /**
   * @return the roles
   */
  public Set<UserRole> getRoles() {
    return roles;
  }

  /**
   * @param roles
   *          the roles to set
   */
  public void setRoles(Set<UserRole> roles) {
    this.roles = roles;
  }

  public Date getDateOfBirth() {
    return dateOfBirth;
  }

  public void setDateOfBirth(Date dateOfBirth) {
    this.dateOfBirth = dateOfBirth;
  }

  @Override
  public void prePersist() {
    // Do nothing for this domain model object
  }
}