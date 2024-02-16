package dblue.agri.web.examples.first;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.Model;

public class FirstHomePage extends WebPage {

  @SuppressWarnings("serial")
  public FirstHomePage() {
    add(new Label("header", "Wicket Demo"));

    Model<String> subHeaderModel = new Model<String>() {
      @Override
      public String getObject() {
        return "how to start, how to improve...";
      }
    };

    Label label = new Label("subHeader", subHeaderModel);
    add(label);
  }

}
