type KKK<
    V extends any
> = V extends Record<infer KK1, any>
  ? [
    KK1,
    ...(V[KK1] extends { [K in infer KK2]: any } ? [
        KK2,
        ...(V[KK1][KK2] extends Record<infer KK3, any> ? [KK3] : [])
        ]
        :
        [] )
    ]
  : [];

type A = {
    n: string;
    b: { p: number; p1: string }
    s: { g: { pp: number }, g1: { pp1: string } }
};

type R = string extends { [K in infer KK1]: any } ? KK1 : false

const ttt: KKK<A> = ['b'];

const t2: KKK<{ p: string }> = ["p"];

type N = A["b"] extends object ? true : false;
