import ConditionSocialLinks from "@/components/ConditionSocialLinks";

export default function FooterMini({
  socialBlock,
  showSocialBlock = false,
  useInnerContainer = true,
  outerPaddingClassName = "px-4 md:px-6",
  contentWidthClassName = "max-w-6xl",
}) {
  const content = (
    <>
      {showSocialBlock && socialBlock ? (
        <div className="mb-6">
          <ConditionSocialLinks
            eyebrow={socialBlock.eyebrow}
            title={socialBlock.title}
            links={socialBlock.links}
          />
        </div>
      ) : null}

      <div className="flex flex-col items-center justify-between gap-4 pb-8 text-[11px] text-white/50 md:flex-row">
        <p className="text-center tracking-[0.18em] md:text-left">
          © 2026 HIMIKO RIVER — ВСЕ ПРАВА ЗАЩИЩЕНЫ
        </p>

        <p className="max-w-md text-center leading-relaxed text-white/40 md:text-right">
          Instagram принадлежит компании Meta Platforms Inc., деятельность
          которой признана экстремистской и запрещена на территории
          Российской Федерации.
          <br />
          Упоминание осуществляется исключительно в информационных целях.
        </p>
      </div>
    </>
  );

  return (
    <footer className="relative z-10 w-full">
      {useInnerContainer ? (
        <div className={`relative z-10 w-full ${outerPaddingClassName}`}>
          <div className={`mx-auto w-full ${contentWidthClassName}`}>
            {content}
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full pt-6">{content}</div>
      )}
    </footer>
  );
}