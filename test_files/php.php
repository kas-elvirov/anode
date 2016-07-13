<?php
class DVD{
    protected $_id;
    protected $_title;
    protected $_band;
    protected $_tracks = array();
    protected $_db;

    function __construct($id=0){
        $this->_id = $id;
        $this->_db = DB::getInstance();
    }

    public function setTitle($title){
        $this->_title = $title;
    }

    public function setBand($band){
        $this->_band = $band;
    }

    /* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet vitae orci et cursus. Nam viverra aliquet maximus.  */
    public function addTrack($track){
        $this->_tracks[] = $track;
    }

    /* Lorem ipsum dolor sit amet */
    public function buy(){
        $this->_db->updateQuantity($this->_id, -1);
        // Lorem ipsum dolor sit amet
    }

    /* Lorem ipsum dolor sit amet */
    public function showCatalog(){
        $result = $this->_db->selectItems();
        if(is_array($result))
            return $result;
        else
            return 'Íå ñðîñëîñü';
    }

    /* 	Ïîêàçûâàåì ñïèñîê âñåõ òðåêîâ âûáðàííîãî èñïîëíèòåëÿ 
        *	ñãðóïïèðîâàííûõ ïî àëüáîìàì
        */
    public function showBand($band){
        $result = $this->_db->selectItemsByBand($band);
        if(is_array($result))
            return $result;
        else
            return 'Íå ñðîñëîñü';
    }

    /* Ïîêàçûâàåì âûáðàííûé àëüáîì ñî ñïèñêîì òðåêîâ */
    public function showAlbum($id){
        $result = $this->_db->selectItemsByTitle($id);
        if(is_array($result))
            return $result;
        else
            return 'Íå ñðîñëîñü';
    }

    /* Ñîõðàíåíèå èíôîðìàöèè îá àëüáîìå â ôîðìàòå XML */
    //public function getXML($id){}


    /* Çàïèñûâàåì êîëëåêöèþ òðåêîâ â ôàéë. Ïðîñòî äëÿ äåìîíñòðàöèè */
    function __destruct(){
        if($this->_tracks){
            file_put_contents(__DIR__.'/tracks.log', time().'|'.serialize($this->_tracks)."\n", FILE_APPEND);
        }
    }
}

class DVDStrategy {
    protected $_strategy;

    function get() {
        return $this->_strategy->get();
    }

    function setStrategy($obj) {
        $this->$_strategy = $obj;
    }

    function __call($method, $args) {
        $this->_strategy->method($args[0]);
    }
}

interface DVDFormat {
    function get();
}

class DVDAsXML extends DVD implements DVDFormat {
    function get() {
        $doc = new DomDocument('1.0', 'utf-8');
        $doc->formatOutput = true;
        $doc->preserveWhiteSpace = false;
        $root = $doc->createElement('dvd');
        $doc->appendChild($root);
        $band = $doc->createElement('band', $this->_band);
        $root->appendChild($band);
        $title = $doc->createElement('title', $this->_title);
        $root->appendChild($title);

        $tracks = $doc->createElement('tracks');
        $root->appendChild($tracks);
        $result = $this->_db->selectItemsByTitle($id);
        foreach($result as $item){
            $track = $doc->createElement('track', $item['title']);
            $tracks->appendChild($track);
        }
        $file_name = $this->_band.'-'.$this->_title.'.xml';
        file_put_contents('output/'.$file_name, $doc->saveXML());
    }
}

class DVDAsXML extends DVD implements DVDFormat {
    function get() {
        // ...
        file_put_contents('output/'.$file_name, json_encode($doc));
    }
}

class BonusDVD extends DVD {

    function __construct($id=0){
        parent::__construct();
        $this->_tracks[] = -1;
    }

}

class DVDFactory{
    public static function create($type) {
        $class = ucfirst($type).'DVD';

        return new $class;
    }
}

