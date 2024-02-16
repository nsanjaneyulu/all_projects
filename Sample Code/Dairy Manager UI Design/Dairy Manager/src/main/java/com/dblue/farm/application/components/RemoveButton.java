package com.dblue.farm.application.components;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


public abstract class RemoveButton extends EditorButton
{

    public RemoveButton(String id,ListEditor< ? > parent)
    {
        super(id,parent);
        setDefaultFormProcessing(false);
    }
   

    protected  List<ListItem< ? >> getItems()
    {
    	List<ListItem<?>> selectedItems = new ArrayList<ListItem<?>>();
    	// get checked item,
    	Iterator<?> it = getEditor().iterator();
		while( it.hasNext()){
			ListItem<?> item = (ListItem<?>)it.next();
			/*CheckBox cBox = (CheckBox)item.get(1);
			if( "on".equals(cBox.getValue() )|| "true".equals(cBox.getValue()))   {														
				selectedItems.add(item);
			}*/
			if( isItemSelected(item)){
				selectedItems.add(item);
				trackRemovedDomainObject(item);
			}
		}
		return selectedItems;
    }
    
    protected abstract boolean isItemSelected(ListItem<?> item);
    
    protected abstract void trackRemovedDomainObject(ListItem<?> item);
    

	
}

