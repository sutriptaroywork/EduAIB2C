import { NextResponse } from "next/server";

export function middleware(request) {
    const url = request.nextUrl.clone();
    let isLoggedIn = request.cookies.get("isLoggedIn");
    let isComplete = request.cookies.get("isComplete")?.value === "true";
    let hasGToken = null
    if (url.pathname == "/profile" || url.pathname == "/dashboard") {
        hasGToken = url.search.includes("gToken");
    }
    
    if (hasGToken) {
        if (url.pathname == "/profile" || url.pathname == "/dashboard") {
            let response = NextResponse.next()

            response.headers.append('Access-Control-Allow-Credentials', "true")
            response.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
            response.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
            response.headers.append(
                'Access-Control-Allow-Headers',
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            )
    
            response.cookies.set("isLoggedIn", "true")
            response.cookies.set("isComplete",url.pathname == "/profile" ? "false": "true")  
            let token= url.search.split('?gToken=')[1];
            response.cookies.set("gToken", token)          
            return response
        }
        return NextResponse.redirect(url);
    } else if (isLoggedIn && isComplete) {
        if (url.pathname === "/" || url.pathname === "/login" || url.pathname === "/profile") {
            url.pathname = "/advance-search";
            return NextResponse.redirect(url);
        }
    } else if (isLoggedIn && !isComplete) {
        if (url.pathname === "/" || url.pathname === '/login' || url.pathname === '/dashboard') {
            url.pathname = "/profile";
            return NextResponse.redirect(url);
        }
    } else if (isComplete && url.pathname === "/profile") {
        url.pathname = "/advance-search";
        return NextResponse.redirect(url);
    }
    else {
        if (request.nextUrl.pathname.startsWith("/dashboard") || url.pathname === "/profile") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
    let response = NextResponse.next();
    response.headers.append('Access-Control-Allow-Credentials', "true")
    response.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    response.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    response.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return response;
}
