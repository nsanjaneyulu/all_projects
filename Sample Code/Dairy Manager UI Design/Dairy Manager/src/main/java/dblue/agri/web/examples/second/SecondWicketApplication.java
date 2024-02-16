package dblue.agri.web.examples.second;

import java.util.Locale;

import org.apache.wicket.Page;
import org.apache.wicket.protocol.http.WebApplication;

import dblue.agri.web.examples.first.FirstHomePage;

/**
 * Application object for your web application.
 * 
 */
public class SecondWicketApplication extends WebApplication {

  /**
   * Constructor
   */
  public SecondWicketApplication() {
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
  public Class<? extends Page> getHomePage() {
    return SecondHomePage.class;
  }

  /**
   * Initializes the bookmarkable pages
   */
  protected void initializeBookmarks() {
    this.mountBookmarkablePage("/first", FirstHomePage.class);
  }

}
