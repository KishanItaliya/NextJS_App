import { NextPageContext } from "next";
import fetch from "isomorphic-unfetch";
import Router from "next/router";

export async function myGet(url: string, context: NextPageContext) {
    const cookie = context.req?.headers.cookie;
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    });

    if(resp.status === 401 && !context.req) {
        Router.replace("/login");
        return {};
    }

    if(resp.status === 401 && context.req) {
        context.res?.writeHead(302, {
            Location: "http://localhost:3000/login"
        });
        context.res?.end();
        return;
    }

    const json = await resp.json();
    return json;
}