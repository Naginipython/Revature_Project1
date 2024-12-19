package com.revature.aspects;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// This is a custom annotation that we'll use to mark methods that should only be accessible by managers
@Target(ElementType.METHOD) // This annotation can only be applied to methods
@Retention(RetentionPolicy.RUNTIME) // This will be available at runtime
public @interface ManagerOnly {
    
}
