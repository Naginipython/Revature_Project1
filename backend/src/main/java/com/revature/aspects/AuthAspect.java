package com.revature.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpSession;

@Aspect // This class triggers functionality when certain methods is called
@Component
public class AuthAspect {
    // 2 use cases:
    // - When any method in the coller is called, we'll check is the user is logged in
    // - When a method with our custom @AdminOnly annotation is called, we'll check if the user is a manager

    // This advice will check if the requester is logged in after any controller method is called
    // EXCEPT login or register
    @Order(1) // Make this always go first
    @Before("within(com.revature.controllers.*) " +
            "&& !execution(* com.revature.controllers.AuthController.login(..))" +
            "&& !execution(* com.revature.controllers.UserController.createUser(..))")
    public void checkLoggedIn() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);
        // System.out.println(session.getAttribute("userId"));
        if (session == null || session.getAttribute("userId") == null) {
            throw new IllegalArgumentException("User is not logged in");
        }
    }

    // This advice will check if the requester is a manager before any method with the @ManagerOnly annotation is called
    @Before("@annotation(com.revature.aspects.ManagerOnly)") //com.revature.aspects.ManagerOnly
    public void checkManager() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attr.getRequest().getSession(false);

        // session checking happens in checkLoggedIn
        if (!session.getAttribute("role").equals("manager")) {
            throw new IllegalArgumentException("User is not authorized to perform this action");
        }
    }
}
