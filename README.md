## ディレクトリ構成
「Sass」のディレクトリと「Hbs/include」のディレクトリの中身は基本的には対（=イコール）の関係になるようにする。

## ベンダープレフィックス
パーシャルファイルの中では使わず「Gruntfile.js」の中にある「autoprefixer」の機能を利用して自動付与するようにしている。

## コメントアウト
Scssファイルはフロント側だけでのやりとりの場合は「__`// hogehoge`__」を使うようにし、開発側にも伝達事項のある際は「__`/* hogehoge */`__」とういうような形で明示するようにする。

## クラス
- ページ毎のbodyのClass名について
各ページでのスタイルの違いを埋めるべく「body」には以下のようにクラスを振ることとした。
- 接頭辞「page-ファイル名」  
例）index.html(全国版TOP) → page-**index**  
例2）search_result.html(検索結果) → page-**search_result**

## jQueryのフックについて
- 接頭辞「js-」を付与する。
- クラス名はscriptの処理に関係のあるものにする。

例）js-open-list → アコーディオンメニュー
~~~html
<div class="js-open-list">
　　<ul>
　　　　<li>AAAAA</li>
　　　　<li>BBBBB</li>
　　</ul>
</div>
~~~

## 各種ファイルの命名について
それぞれ法則に基づいて命名する。  
例）アイコン 接頭辞「icon_」を付与する。

## include元のファイル名
連想しやすいように下記の例に習ってファイル名と分岐する名称を似せる。

~~~hbs
{{#if isPageTop}}
{{> page_top}}
{{/if}}
~~~
