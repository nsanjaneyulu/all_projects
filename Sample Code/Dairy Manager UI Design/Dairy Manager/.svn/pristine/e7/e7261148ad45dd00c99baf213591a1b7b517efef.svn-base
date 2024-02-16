package dblue.agri.web.examples.first;

import java.util.Locale;

import org.apache.wicket.Page;
import org.apache.wicket.protocol.http.WebApplication;

/**
 * Application object for your web application.
 * 
 */
public class FirstWicketApplication extends WebApplication {

  /**
   * Constructor
   */
  public FirstWicketApplication() {
  }

  /**
   * Init the application
   */
  @Override
  protected void init() {
    super.init();

    // Define locale to be used when locale can not be determined.
    Locale.setDefault(Locale.ENGLISH);

    initializeBookmarks();
  }

  /**
   * @see org.apache.wicket.Application#getHomePage()
   */
  @Override
  public Class<? extends Page> getHomePage() {
    return FirstHomePage.class;
  }

  /**
   * Initializes the bookmarkable pages
   */
  protected void initializeBookmarks() {
    this.mountBookmarkablePage("/first", FirstHomePage.class);
  }

}
