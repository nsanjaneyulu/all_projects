package com.dblue.farm.exception;

public class NotFoundException extends FarmException{

	private static final long serialVersionUID = 1L;

	public NotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public NotFoundException(String msg, Throwable throwable) {
		super(msg, throwable);
		// TODO Auto-generated constructor stub
	}

	public NotFoundException(String msg) {
		super(msg);
		// TODO Auto-generated constructor stub
	}

	public NotFoundException(Throwable throwable) {
		super(throwable);
		// TODO Auto-generated constructor stub
	}
}
