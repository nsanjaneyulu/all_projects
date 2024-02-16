package com.dblue.farm.application.components;

import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.markup.html.form.Form;


public abstract class EditorButton extends AjaxButton
{
    private ListEditor< ? > parent;

    public EditorButton(String id,ListEditor< ? > parent)
    {
        super(id);
        this.parent = parent;
    }

    protected  abstract List<ListItem< ? >> getItems();
    

    protected final List< ? > getList()
    {
        return getEditor().items;
    }

    protected final ListEditor< ? > getEditor()
    {
    	if( null == parent){
    		EditorAwareForm parentForm = (EditorAwareForm)getParent().getParent();
    		parent = parentForm.getEditor();    		
    	}
    	return this.parent;
    }
    
    
    
    @Override
	protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
    	List<ListItem<?>> selectedItems = getItems();
    	
    	for( ListItem<?> item : selectedItems){
		int idx = item.getIndex();

        for (int i = idx + 1; i < item.getParent().size(); i++)
        {
            ListItem< ? > itemIntrnl = (ListItem< ? >)item.getParent().get(i);
            itemIntrnl.setIndex(itemIntrnl.getIndex() - 1);
        }

        getList().remove(idx);
        getEditor().remove(item);
    	}
        target.addComponent(form);
		
	}
    
    @Override
    protected void onDetach()
    {
        parent = null;
        super.onDetach();
    }

}
