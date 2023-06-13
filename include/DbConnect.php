<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = 'localhost';
		private $dbname = 'PostDemo';
		private $user = 'root';
		private $pass = 'P@ssword';
		private static $obj = '';
		private static $conn = '';

		private function __construct(){
			try {
				self::$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			} catch (\Exception $e) {
				echo "Database Connection Failed with error: " . $e->getMessage();
			}
		}

		public static function connect(){
			if(self::$obj == ''){
				self::$obj = new self;
			}
			return self::$conn;
		}

	}
?>