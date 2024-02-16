package com.dblue.farm.application.reports;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class SuggestedFeedingReportHelper implements Serializable {
	
	private Map<Key,Number> aggregationData = new HashMap<Key,Number>();
	
	public void put(Key key, Number number){
		synchronized (aggregationData) {
			aggregationData.put(key, number);
		}
		
	}
	
	public Iterator<Key> getKeys(){
		return aggregationData.keySet().iterator();
	}
	
	public Number getValue(Key key){
		return aggregationData.get(key);
	}
	
	public void add(Key key,Number number){
		synchronized (aggregationData) {
			Number storedNumber = aggregationData.get(key);
			
			if( null == storedNumber){
				aggregationData.put(key, number);
			}else{
				Number newNumber = new Double(storedNumber.doubleValue()+ number.doubleValue());
				aggregationData.put(key, newNumber);
			}
		}		
	}	
	
	public void add(SuggestedFeedingReportHelper that){
		synchronized (aggregationData) {
			Map<Key, Number> thatAggregationData =that.aggregationData;
			Iterator<Key> keyIterator  = that.aggregationData.keySet().iterator();
			while( keyIterator.hasNext()){
				Key key = keyIterator.next();
				Number thatValue = thatAggregationData.get(key);
				if( aggregationData.containsKey(key)){
					Number existingValue = aggregationData.get(key);					
					Number newValue = new Double(existingValue.doubleValue()+thatValue.doubleValue());
					aggregationData.put(key, newValue);
				}else{
					aggregationData.put(key, thatValue);
				}
			}			
		}		
	}
	
	public void applyNumberOfDays(int factor){
		Iterator<Key> it  = aggregationData.keySet().iterator();
		
		while( it.hasNext()){
			Key key  =  it.next();
			Number value = aggregationData.get(key);
			Number newValue = new Double(value.doubleValue()*factor);
			aggregationData.put(key, newValue);
		}
	}
	
	public void clearData(){
		aggregationData.clear();
	}
	
	public static class Key implements Serializable,Comparable {

		private String feed_type;
		private String state_type;
		
		public String getStateType(){
			return state_type;
		}
		
		public String getFeedType(){
			return feed_type;
		}

		public Key(String feed_type, String state_type) {
			if (feed_type == null || state_type == null) {
				throw new IllegalArgumentException(
						"Invalid feed_type or state_type");
			}
			this.feed_type = feed_type;
			this.state_type = state_type;

			// dont accept null values
		}

		@Override
		public boolean equals(Object obj) {
			if (null != obj) {
				Key that = (Key) obj;
				return this.feed_type.equals(that.feed_type)
						&& this.state_type.equals(that.state_type);
			} else {
				return false;
			}
		}

		@Override
		public int hashCode() {
			return feed_type.hashCode()+state_type.hashCode();
		}

		public int compareTo(Object o) {
			Key that = (Key)o;
			return (this.feed_type).compareTo(that.feed_type);
		}

	}


}

