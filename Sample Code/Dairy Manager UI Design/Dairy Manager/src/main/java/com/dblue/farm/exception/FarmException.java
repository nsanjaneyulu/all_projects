package com.dblue.farm.exception;

public class FarmException extends Exception {

    public FarmException() {
        super();
    }

    public FarmException(String msg) {
        super(msg);
    }

    public FarmException(String msg, Throwable throwable) {
        super(msg, throwable);
    }

    public FarmException(Throwable throwable) {
        super(throwable);
    }
}

