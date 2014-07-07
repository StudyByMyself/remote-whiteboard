Prism.languages.c = Prism.languages.extend('clike', {
	'keyword': /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,
	'operator': /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\//g
});

Prism.languages.insertBefore('c', 'keyword', {
    //property class reused for macro statements
    'property': {
        pattern:/#[a-zA-Z]+\ .*/g,
        inside: {
            property: /&lt;[a-zA-Z.]+>/g
        }
    }
});

Prism.languages.cpp = Prism.languages.extend('c', {
  'keyword': /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,
  'operator': /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|:{1,2}|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g
});

Prism.languages.coffeescript = Prism.languages.extend('javascript', {
  'block-comment': /([#]{3}\s*\r?\n(.*\s*\r*\n*)\s*?\r?\n[#]{3})/g,
  'comment': /(\s|^)([#]{1}[^#^\r^\n]{2,}?(\r?\n|$))/g,
  'keyword': /\b(this|window|delete|class|extends|namespace|extend|ar|let|if|else|while|do|for|each|of|return|in|instanceof|new|with|typeof|try|catch|finally|null|undefined|break|continue)\b/g
});

Prism.languages.insertBefore('coffeescript', 'keyword', {
  'function': {
    pattern: /[a-z|A-z]+\s*[:|=]\s*(\([.|a-z\s|,|:|{|}|\"|\'|=]*\))?\s*-&gt;/gi,
    inside: {
      'function-name': /[_?a-z-|A-Z-]+(\s*[:|=])| @[_?$?a-z-|A-Z-]+(\s*)| /g,
      'operator': /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g
    }
  },
  'attr-name': /[_?a-z-|A-Z-]+(\s*:)| @[_?$?a-z-|A-Z-]+(\s*)| /g
});

Prism.languages.css = {
  'comment': /\/\*[\w\W]*?\*\//g,
  'atrule': {
    pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
    inside: {
      'punctuation': /[;:]/g
    }
  },
  'url': /url\((["']?).*?\1\)/gi,
  'selector': /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  'property': /(\b|\B)[\w-]+(?=\s*:)/ig,
  'string': /("|')(\\?.)*?\1/g,
  'important': /\B!important\b/gi,
  'punctuation': /[\{\};:]/g,
  'function': /[-a-z0-9]+(?=\()/ig
};

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'style': {
      pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/ig,
      inside: {
        'tag': {
          pattern: /<style[\w\W]*?>|<\/style>/ig,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.css
      }
    }
  });
}

Prism.languages.go = Prism.languages.extend('clike', {
  'keyword': /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g,
  'builtin': /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/g,
  'boolean': /\b(_|iota|nil|true|false)\b/g,
  'operator': /([(){}\[\]]|[*\/%^!]=?|\+[=+]?|-[>=-]?|\|[=|]?|>[=>]?|<(<|[=-])?|==?|&(&|=|^=?)?|\.(\.\.)?|[,;]|:=?)/g,
  'number': /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/ig,
  'string': /("|'|`)(\\?.|\r|\n)*?\1/g
});
delete Prism.languages.go['class-name'];

Prism.languages.markup = {
  'comment': /<!--[\w\W]*?-->/g,
  'prolog': /<\?.+?\?>/,
  'doctype': /<!DOCTYPE.+?>/,
  'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
  'tag': {
    pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      'tag': {
        pattern: /^<\/?[\w:-]+/i,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[\w-]+?:/
        }
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          'punctuation': /=|>|"/g
        }
      },
      'punctuation': /\/?>/g,
      'attr-name': {
        pattern: /[\w:-]+/g,
        inside: {
          'namespace': /^[\w-]+?:/
        }
      }

    }
  },
  'entity': /\&#?[\da-z]{1,8};/gi
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
Prism.languages.c = Prism.languages.extend('clike', {
  'keyword': /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,
  'operator': /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\//g
});

Prism.languages.insertBefore('c', 'keyword', {
  //property class reused for macro statements
  'property': {
    pattern:/#[a-zA-Z]+\ .*/g,
    inside: {
      property: /&lt;[a-zA-Z.]+>/g
    }
  }
});

Prism.languages.cpp = Prism.languages.extend('c', {
  'keyword': /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,
  'operator': /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|:{1,2}|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g
});

Prism.languages.coffeescript = Prism.languages.extend('javascript', {
  'block-comment': /([#]{3}\s*\r?\n(.*\s*\r*\n*)\s*?\r?\n[#]{3})/g,
  'comment': /(\s|^)([#]{1}[^#^\r^\n]{2,}?(\r?\n|$))/g,
  'keyword': /\b(this|window|delete|class|extends|namespace|extend|ar|let|if|else|while|do|for|each|of|return|in|instanceof|new|with|typeof|try|catch|finally|null|undefined|break|continue)\b/g
});

Prism.languages.insertBefore('coffeescript', 'keyword', {
  'function': {
    pattern: /[a-z|A-z]+\s*[:|=]\s*(\([.|a-z\s|,|:|{|}|\"|\'|=]*\))?\s*-&gt;/gi,
    inside: {
      'function-name': /[_?a-z-|A-Z-]+(\s*[:|=])| @[_?$?a-z-|A-Z-]+(\s*)| /g,
      'operator': /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g
    }
  },
  'attr-name': /[_?a-z-|A-Z-]+(\s*:)| @[_?$?a-z-|A-Z-]+(\s*)| /g
});

Prism.languages.css = {
  'comment': /\/\*[\w\W]*?\*\//g,
  'atrule': {
    pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
    inside: {
      'punctuation': /[;:]/g
    }
  },
  'url': /url\((["']?).*?\1\)/gi,
  'selector': /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  'property': /(\b|\B)[\w-]+(?=\s*:)/ig,
  'string': /("|')(\\?.)*?\1/g,
  'important': /\B!important\b/gi,
  'punctuation': /[\{\};:]/g,
  'function': /[-a-z0-9]+(?=\()/ig
};

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'style': {
      pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/ig,
      inside: {
        'tag': {
          pattern: /<style[\w\W]*?>|<\/style>/ig,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.css
      }
    }
  });
}

Prism.languages.go = Prism.languages.extend('clike', {
  'keyword': /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g,
  'builtin': /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/g,
  'boolean': /\b(_|iota|nil|true|false)\b/g,
  'operator': /([(){}\[\]]|[*\/%^!]=?|\+[=+]?|-[>=-]?|\|[=|]?|>[=>]?|<(<|[=-])?|==?|&(&|=|^=?)?|\.(\.\.)?|[,;]|:=?)/g,
  'number': /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/ig,
  'string': /("|'|`)(\\?.|\r|\n)*?\1/g
});
delete Prism.languages.go['class-name'];

Prism.languages.markup = {
  'comment': /<!--[\w\W]*?-->/g,
  'prolog': /<\?.+?\?>/,
  'doctype': /<!DOCTYPE.+?>/,
  'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
  'tag': {
    pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      'tag': {
        pattern: /^<\/?[\w:-]+/i,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[\w-]+?:/
        }
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          'punctuation': /=|>|"/g
        }
      },
      'punctuation': /\/?>/g,
      'attr-name': {
        pattern: /[\w:-]+/g,
        inside: {
          'namespace': /^[\w-]+?:/
        }
      }

    }
  },
  'entity': /\&#?[\da-z]{1,8};/gi
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});

Prism.languages.java = Prism.languages.extend('clike', {
  'keyword': /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
  'number': /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\W\d*\.?\d+\b/gi,
  'operator': {
    pattern: /([^\.]|^)([-+]{1,2}|!|=?<|=?>|={1,2}|(&){1,2}|\|?\||\?|\*|\/|%|\^|(<){2}|(>){2,3}|:|~)/g,
    lookbehind: true
  }
});

Prism.languages.javascript = Prism.languages.extend('clike', {
  'keyword': /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
  'number': /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});

Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true
  }
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore('markup', 'tag', {
    'script': {
      pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/ig,
      inside: {
        'tag': {
          pattern: /<script[\w\W]*?>|<\/script>/ig,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.javascript
      }
    }
  });
}

Prism.languages.objectivec = Prism.languages.extend('c', {
  'keyword': /(\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b)|((?=[\w|@])(@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b)/g,
  'string': /(?:("|')(\\?.)*?\1)|(?:@"(\\?.)*?")/g,
  'operator': /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%|@/g,
});


/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 *
 * Supports the following:
 * 		- Extends clike syntax
 * 		- Support for PHP 5.3+ (namespaces, traits, generators, etc)
 * 		- Smarter constant and function matching
 *
 * Adds the following new token classes:
 * 		constant, delimiter, variable, function, package
 */

Prism.languages.php = Prism.languages.extend('clike', {
  'keyword': /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/ig,
  'constant': /\b[A-Z0-9_]{2,}\b/g,
  'comment': {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,
    lookbehind: true
  }
});

Prism.languages.insertBefore('php', 'keyword', {
  'delimiter': /(\?>|<\?php|<\?)/ig,
  'variable': /(\$\w+)\b/ig,
  'package': {
    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,
    lookbehind: true,
    inside: {
      punctuation: /\\/
    }
  }
});

// Must be defined after the function pattern
Prism.languages.insertBefore('php', 'operator', {
  'property': {
    pattern: /(->)[\w]+/g,
    lookbehind: true
  }
});

// Add HTML support of the markup language exists
if (Prism.languages.markup) {

  // Tokenize all inline PHP blocks that are wrapped in <?php ?>
  // This allows for easy PHP + markup highlighting
  Prism.hooks.add('before-highlight', function(env) {
    if (env.language !== 'php') {
      return;
    }

    env.tokenStack = [];

    env.code = env.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/ig, function(match) {
      env.tokenStack.push(match);

      return '{{{PHP' + env.tokenStack.length + '}}}';
    });
  });

  // Re-insert the tokens after highlighting
  Prism.hooks.add('after-highlight', function(env) {
    if (env.language !== 'php') {
      return;
    }

    for (var i = 0, t; t = env.tokenStack[i]; i++) {
      env.highlightedCode = env.highlightedCode.replace('{{{PHP' + (i + 1) + '}}}', Prism.highlight(t, env.grammar, 'php'));
    }

    env.element.innerHTML = env.highlightedCode;
  });

  // Wrap tokens in classes that are missing them
  Prism.hooks.add('wrap', function(env) {
    if (env.language === 'php' && env.type === 'markup') {
      env.content = env.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, "<span class=\"token php\">$1</span>");
    }
  });

  // Add the rules before all others
  Prism.languages.insertBefore('php', 'comment', {
    'markup': {
      pattern: /<[^?]\/?(.*?)>/g,
      inside: Prism.languages.markup
    },
    'php': /\{\{\{PHP[0-9]+\}\}\}/g
  });
}
Prism.languages.python= {
  'comment': {
    pattern: /(^|[^\\])#.*?(\r?\n|$)/g,
    lookbehind: true
  },
  'string': /"""[\s\S]+?"""|("|')(\\?.)*?\1/g,
  'keyword' : /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,
  'boolean' : /\b(True|False)\b/g,
  'number' : /\b-?(0x)?\d*\.?[\da-f]+\b/g,
  'operator' : /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,
  'ignore' : /&(lt|gt|amp);/gi,
  'punctuation' : /[{}[\];(),.:]/g
};

/**
 * Original by Samuel Flores
 *
 * Adds the following new token classes:
 * 		constant, builtin, variable, symbol, regex
 */
Prism.languages.ruby = Prism.languages.extend('clike', {
  'comment': /#[^\r\n]*(\r?\n|$)/g,
  'keyword': /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,
  'builtin': /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
  'constant': /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g
});

Prism.languages.insertBefore('ruby', 'keyword', {
  'regex': {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true
  },
  'variable': /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,
  'symbol': /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g
});
Prism.languages.sql= {
  'comment': {
    pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,
    lookbehind: true
  },
  'string' : /("|')(\\?.)*?\1/g,
  'keyword' : /\b(ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMPORARY|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,
  'boolean' : /\b(TRUE|FALSE|NULL)\b/gi,
  'number' : /\b-?(0x)?\d*\.?[\da-f]+\b/g,
  'operator' : /\b(ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|=?&lt;|=?&gt;|={1}|(&amp;){1,2}|\|?\||\?|\*|\//gi,
  'ignore' : /&(lt|gt|amp);/gi,
  'punctuation' : /[;[\]()`,.]/g
};
