<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Warehouses_checkins extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('warehouses_checkins_model');
		$this->load->model('products_variations_model');
		$this->load->model('warehouses_model');
		$this->load->model('products_model');
		$this->load->model('suppliers_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}



	public function warehouses_checkins_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		if($isValidToken) {

		$items = $this->warehouses_checkins_model->get_warehouses_checkins_by_client($id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'warehouse_id' => $item->warehouse_id,
					'description' => $item->description,
					'description_full' => $item->description_full,
					'works_id' => $item->works_id,
					'product_id' => $item->product_id,
					'employee_id' => $item->employee_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'code' => $item->code,
					'code_int' => $item->code_int,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at,
					'pieces' => $item->pieces,
					'boxes' => $item->boxes,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}




public function count_total_warehouses_checkins_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {



		$posts = $this->warehouses_checkins_model->count_total_warehouses_checkins_employee($id, $user_id);

		
		}
	}


public function count_total_vacations_warehouses_checkins_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		

		$posts = $this->warehouses_checkins_model->count_total_vacations_warehouses_checkins_employee($id, $user_id);

		
		
	}


public function count_total_permissions_warehouses_checkins_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		

		$posts = $this->warehouses_checkins_model->count_total_permissions_warehouses_checkins_employee($id, $user_id);

		
		
	}

public function timesheet_by_project_employee($product_id, $user_id) {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');
		$isValidToken = $this->api_model->checkToken($token, $user_id);

        foreach ($this->warehouses_checkins_model->timesheet_by_project_employee($product_id, $user_id) as $result) {
            $data[] = array(
                'id' => $result['x'],
                'value' => number_format((float)$result['y'], 0, '.', ''),
            );
        }

        $this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($data)); 
    

  }



public function warehouses_checkins_by_employee($id, $user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

		$items = $this->warehouses_checkins_model->get_warehouses_checkins_by_employee($id, $user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'warehouse_id' => $item->warehouse_id,
					'description' => $item->description,
					'works_id' => $item->works_id,
					'product_id' => $item->product_id,
					'employee_id' => $item->employee_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'created_at' => $item->created_at,
					'pieces' => $item->pieces,
					'boxes' => $item->boxes,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}





public function list_user($user_id)
	{
		$category_name = $this->input->get('name');
		$category_description = $this->input->get('description');

		$size = $this->warehouses_checkins_model->count_warehouses_checkins_search($category_name, $category_description, $user_id);
     
		header("Access-Control-Allow-Origin: *");
		header( "size: $size", TRUE );		
		//header( "x-total-count: $size", TRUE );	
		header( "Connection: Keep-Alive" );	
		header("Access-Control-Allow-Headers: authorization, Content-Type, size, x-total-count");
		header("Access-Control-Request-Headers: GET, POST, PUT");
		header("Access-Control-Expose-Headers: x-total-count");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

				$_start = $this->input->get('_start');
				$_limit = $this->input->get('_limit');
				$_sort = $this->input->get('_sort');
				//$code = $this->input->get('code');
				//$code_int = $this->input->get('code_int');
				$category_name = $this->input->get('name');
				$category_description = $this->input->get('description');

				//$works_id = $this->input->get('works_id');
				//$category_id = $this->input->get('category_id');
                
				if ($_limit !== NULL && $_limit > 100)
				{
					$_limit = 100;
				}

                if ($_start !== NULL && $_start > 0)
				{
					$_start =$_start*$_limit;
				}



			$posts = array();

			
		if($isValidToken) {

			$blogs = $this->warehouses_checkins_model->get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'warehouse_id' => $this->warehouses_model->get_id($blog->warehouse_id),
					'description' => $blog->description,
					'product_id' => $blog->product_id,
					'product' => $this->products_variations_model->get_id($blog->product_id),
					'image' => base_url('media/images/'.$this->products_variations_model->get_image_name($blog->product_id)),
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'supplier_id' => $this->suppliers_model->get_id($blog->supplier_id),
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'pieces' => $blog->pieces,
					'boxes' => $blog->boxes,
					'created_at' => date("d/m/Y", strtotime($blog->created_at)),
				);
			}
			$total=count($posts);
			header( "size: $total", TRUE );			
			header( "x-total-count: $size", TRUE );	
			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		

		}
	}



public function warehouses_checkins_by_employee_calendar($id, $user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

		$items = $this->warehouses_checkins_model->get_warehouses_checkins_by_employee($id, $user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'warehouse_id' => $item->warehouse_id,
					'description' => $item->description,
					'works_id' => $item->works_id,
					'product_id' => $item->product_id,
					'employee_id' => $item->employee_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'created_at' => $item->created_at,
					'title' => $item->pieces,
					'boxes' => $item->boxes,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}


public function warehouses_checkins_by_project($id, $user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

		$items = $this->warehouses_checkins_model->get_warehouses_checkins_by_project($id, $user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'warehouse_id' => $item->warehouse_id,
					'description' => $item->description,
					'works_id' => $item->works_id,
					'product_id' => $item->product_id,
					'employee_id' => $item->employee_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'created_at' => $item->created_at,
					'pieces' => $item->pieces,
					'boxes' => $item->boxes,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}




	public function count($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $id);

		if($isValidToken) {

			$posts = $this->warehouses_checkins_model->count_warehouses_checkins($id);
	
		}
	}


	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->warehouses_checkins_model->get_warehouses_checkins();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'warehouse_id' => $blog->warehouse_id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'product_id' => $blog->product_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'pieces' => $blog->pieces,
					'boxes' => $blog->boxes,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}


public function user($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->warehouses_checkins_model->get_warehouses_checkins($user_id);
			foreach($blogs as $blog) {
				
				
				$posts[] = array(
					'id' => $blog->id,
					'warehouse_id' => $this->warehouses_model->get_id($blog->warehouse_id),
					'description' => $blog->description,
					'product' => $this->products_variations_model->get_id($blog->product_id),
					'image' => base_url('media/images/'.$this->products_variations_model->get_image_name($blog->product_id)),
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'supplier_id' => $this->suppliers_model->get_id($blog->supplier_id),
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'pieces' => $blog->pieces,
					'boxes' => $blog->boxes,
					'created_at' => $blog->created_at,

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}



	public function today()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {

			$blogs = $this->warehouses_checkins_model->get_warehouses_checkins_date();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'warehouse_id' => $blog->warehouse_id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'product_id' => $blog->product_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'pieces' => $blog->pieces,
					'boxes' => $blog->boxes,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		
			}
		}
	
	
	public function calendar()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->warehouses_checkins_model->get_warehouses_checkins_calendar();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'warehouse_id' => $blog->warehouse_id,
					'description' => $blog->description,
					'works_id' => $blog->works_id,
					'product_id' => $blog->product_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'pieces' => $blog->pieces,
					'boxes' => $blog->boxes,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}

	public function id($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->warehouses_checkins_model->get_id($id);

			$post = array(
					'id' => $blog->id,
					'warehouse_id' => $blog->warehouse_id,
					'description' => $blog->description,
					'product_id' => $blog->product_id,
					'supplier_id' => $blog->supplier_id,
					'supplier_id' => $blog->supplier_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'pieces' => $blog->pieces,
					'boxes' => $blog->boxes,
					'created_at' => $blog->created_at
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		}
	}

	

	

public function warehouse_movement_by_product($id, $user_id)
	{
		

		$size = $this->warehouses_checkins_model->count_warehouse_movement_by_product($id, $user_id);
     
		header("Access-Control-Allow-Origin: *");
		header( "size: $size", TRUE );		
		//header( "x-total-count: $size", TRUE );	
		header( "Connection: Keep-Alive" );	
		header("Access-Control-Allow-Headers: authorization, Content-Type, size, x-total-count");
		header("Access-Control-Request-Headers: GET, POST, PUT");
		header("Access-Control-Expose-Headers: x-total-count");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

				$_start = $this->input->get('_start');
				$_limit = $this->input->get('_limit');
				$_sort = $this->input->get('_sort');
				//$code = $this->input->get('code');
				//$code_int = $this->input->get('code_int');
				

				//$works_id = $this->input->get('works_id');
				//$category_id = $this->input->get('category_id');
                
				if ($_limit !== NULL && $_limit > 100)
				{
					$_limit = 100;
				}

                if ($_start !== NULL && $_start > 0)
				{
					$_start =$_start*$_limit;
				}



			$posts = array();

			
			if($isValidToken) {

			$blogs = $this->warehouses_checkins_model->get_warehouse_movement_by_product($id, $user_id, $_start, $_limit, $_sort);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'warehouse_id' => $this->warehouses_model->get_id($blog->warehouse_id),
					'description' => $blog->description,
					'product_id' => $blog->product_id,
					'supplier_id' => $blog->supplier_id,
					'supplier_id' => $blog->supplier_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'pieces' => $blog->pieces,
					'boxes' => $blog->boxes,
					'created_at' => $blog->created_at
				);
			}
			$total=count($posts);
			header( "size: $total", TRUE );			
			header( "x-total-count: $size", TRUE );	
			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		

				}
	}


	



public function create($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$warehouse_id = $this->input->post('warehouse_id');
			$description = $this->input->post('description');
			$product_id = $this->input->post('product_id');
			$supplier_id = $this->input->post('supplier_id');
			$status = $this->input->post('status');
			$user_id = $this->input->post('user_id');
			$pieces = $this->input->post('pieces');
			$boxes = $this->input->post('boxes');

			$filename = NULL;

			$isUploadError = FALSE;

			if ($_FILES && $_FILES['image']['name']) {

				$config['upload_path']          = './media/images/';
	            $config['allowed_types']        = 'gif|jpg|png|jpeg';
	            $config['max_size']             = 500;

	            $this->load->library('upload', $config);
	            if ( ! $this->upload->do_upload('image')) {

	            	$isUploadError = TRUE;

					$response = array(
						'status' => 'error',
						'message' => $this->upload->display_errors()
					);
	            }
	            else {
	            	$uploadData = $this->upload->data();
            		$filename = $uploadData['file_name'];
	            }
			}

			if( ! $isUploadError) {
	        	$blogData = array(
					'description' => $description,
					'warehouse_id' => $warehouse_id,
					'supplier_id' => $supplier_id,
					'product_id' => $product_id,
					'status' => $status,
					'user_id' => $user_id,
					'pieces' => $pieces,
					'boxes' => $boxes,
					//'is_active' => $is_active,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->warehouses_checkins_model->create($blogData);

				$response = array(
					'status' => 'success'
				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}




	public function update($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->warehouses_checkins_model->get_id($id);
			$warehouse_id = $this->input->post('warehouse_id');
			$description = $this->input->post('description');
			$product_id = $this->input->post('product_id');
			$supplier_id = $this->input->post('supplier_id');
			$status = $this->input->post('status');
			$user_id = $this->input->post('user_id');
			$pieces = $this->input->post('pieces');
			$boxes = $this->input->post('boxes');


			$isUploadError = FALSE;

			if ($_FILES && $_FILES['image']['name']) {

				$config['upload_path']          = './media/images/';
	            $config['allowed_types']        = 'gif|jpg|png|jpeg';
	            $config['max_size']             = 500;

	            $this->load->library('upload', $config);
	            if ( ! $this->upload->do_upload('image')) {

	            	$isUploadError = TRUE;

					$response = array(
						'status' => 'error',
						'message' => $this->upload->display_errors()
					);
	            }
	            else {
	   
					if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
					{
						unlink(FCPATH.'media/images/'.$blog->image);
					}

	            	$uploadData = $this->upload->data();
            		$filename = $uploadData['file_name'];
	            }
			}

			if( ! $isUploadError) {
	        	$blogData = array(
					'description' => $description,
					'warehouse_id' => $warehouse_id,
					'product_id' => $product_id,
					'supplier_id' => $supplier_id,
					'status' => $status,
					'user_id' => $user_id,
					'pieces' => $pieces,
					'boxes' => $boxes,
					//'is_active' => $is_active,
					'created_at' => date('Y-m-d H:i:s', time())

				);

				$this->warehouses_checkins_model->update($id, $blogData);

				$response = array(
					'status' => 'success'
				);
           	}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}


	
	public function delete($id, $user_id)
	{
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->warehouses_checkins_model->get_id($id);


			$this->warehouses_checkins_model->delete($id);

			$response = array(
				'status' => 'success'
			);

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}

}