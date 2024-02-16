package com.dblue.farm.application.dao;

import java.io.Serializable;

import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class UserDAOImpl extends JdbcDaoSupport implements UserDAO
{
	   	

	public Serializable getFarmDetails(String username) {
		String sql = "SELECT farm_id from farm_users where username=?";

			return getJdbcTemplate().queryForLong(sql, new Object[] { username});
	}
}
