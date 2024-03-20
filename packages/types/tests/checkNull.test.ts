import { CheckNull, CheckUndefined, SetNullUndefined } from "../src/deepPick";
import expectType from "../src/isTypeEquals";

expectType<CheckNull<{ p: string } | null, false>, true>(true);
expectType<CheckNull<{ p: string }, false>, false>(false);
expectType<CheckNull<{ p: string } | undefined, false>, false>(false);
expectType<CheckNull<{ p: string } | undefined | null, false>, true>(true);
expectType<CheckNull<null, false>, true>(true);
expectType<CheckNull<undefined | null, false>, true>(true);
expectType<CheckNull<{ p: string }, true>, true>(true);

// CheckUndefined w/o IsArray & IsObject
expectType<
  CheckUndefined<{ p: string } | undefined, false, false, false>,
  true
>(true);
expectType<CheckUndefined<{ p: string }, false, false, false>, false>(false);
expectType<CheckUndefined<{ p: string } | null, false, false, false>, false>(
  false,
);
expectType<
  CheckUndefined<{ p: string } | undefined | null, false, false, false>,
  true
>(true);
expectType<CheckUndefined<undefined, false, false, false>, true>(true);
expectType<CheckUndefined<undefined | null, false, false, false>, true>(true);
expectType<CheckUndefined<{ p: string }, true, false, false>, true>(true);

type C = Exclude<{ p: string } | null | undefined | string[] | string, object>; // extends never ? 1 : 0

// CheckUndefined with BaseType = Array<any>
expectType<CheckUndefined<{ p: string } | undefined, false, true, false>, true>(
  true,
);
expectType<CheckUndefined<{ p: string } | string[], false, true, false>, true>(
  true,
);
expectType<CheckUndefined<{ p: string }[] | null, false, true, false>, false>(
  false,
);
expectType<
  CheckUndefined<{ p: string }[] | undefined | null, false, true, false>,
  true
>(true);
expectType<CheckUndefined<{ p: string }[] | string, false, true, false>, true>(
  true,
);

// CheckUndefined with BaseType = object
expectType<CheckUndefined<{ p: string } | undefined, false, false, true>, true>(
  true,
);
expectType<CheckUndefined<{ p: string } | string[], false, false, true>, true>(
  true,
);
expectType<CheckUndefined<{ p: string } | null, false, false, true>, false>(
  false,
);
expectType<
  CheckUndefined<{ p: string } | undefined | null, false, false, true>,
  true
>(true);
expectType<CheckUndefined<{ p: string } | string, false, false, true>, true>(
  true,
);

expectType<SetNullUndefined<{ p: "p" }, false, false>, { p: "p" }>({ p: "p" });
expectType<SetNullUndefined<{ p: "p" }, true, false>, { p: "p" } | null>({
  p: "p",
});
expectType<SetNullUndefined<{ p: "p" }, false, true>, { p: "p" } | undefined>({
  p: "p",
});
expectType<
  SetNullUndefined<{ p: "p" }, true, true>,
  { p: "p" } | undefined | null
>({ p: "p" });
