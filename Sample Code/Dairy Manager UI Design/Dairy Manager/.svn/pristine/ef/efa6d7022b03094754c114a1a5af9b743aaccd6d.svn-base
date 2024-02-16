package com.dblue.farm.application.components;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.wicket.markup.html.form.IFormModelUpdateListener;
import org.apache.wicket.markup.repeater.RepeatingView;
import org.apache.wicket.model.IModel;

public abstract class ListListEditor<Object> extends RepeatingView implements IFormModelUpdateListener
{
    List<Object> items;

    public ListListEditor(String id, IModel<List<Object>> model)
    {
        super(id, model);
    }

    protected abstract void onPopulateItem(ListItem<Object> item);

    public void addItem(Object value)
    {
        items.add(value);
        ListItem<Object> item = new ListItem<Object>(newChildId(), items.size() - 1);
        add(item);
        onPopulateItem(item);
    }

    @Override
    protected void onBeforeRender()
    {
        if (!hasBeenRendered())
        {
            items = new ArrayList<Object>(getModelObject());
            for (int i = 0; i < items.size(); i++)
            {
                ListItem<Object> li = new ListItem<Object>(newChildId(), i);
                add(li);
                onPopulateItem(li);
            }
        }
        super.onBeforeRender();
    }

    public void updateModel()
    {
        setModelObject(items);
    }

    /**
     * Indicates whether or not the item can be removed, usually by the use of {@link RemoveButton}
     * 
     * @param items
     * @param item
     * @return
     */
    public boolean canRemove(List<Object> items, Object item)
    {
        return true;
    }

    @SuppressWarnings("unchecked")
    final boolean checkRemove(ListItem< ? > item)
    {
        List<Object> list = Collections.unmodifiableList(items);
        ListItem<Object> li = (ListItem<Object>)item;
        return canRemove(list, li.getModelObject());
    }

    /**
     * Gets model
     * 
     * @return model
     */
    @SuppressWarnings("unchecked")
    public final IModel<List<Object>> getModel()
    {
        return (IModel<List<Object>>)getDefaultModel();
    }

    /**
     * Sets model
     * 
     * @param model
     */
    public final void setModel(IModel<List<Object>> model)
    {
        setDefaultModel(model);
    }

    /**
     * Gets model object
     * 
     * @return model object
     */
    @SuppressWarnings("unchecked")
    public final List<Object> getModelObject()
    {
        return (List<Object>)getDefaultModelObject();
    }

    /**
     * Sets model object
     * 
     * @param object
     */
    public final void setModelObject(List<Object> object)
    {
        setDefaultModelObject(object);
    }

    public List<Object> getItems(){
    	return items;
    }

}

