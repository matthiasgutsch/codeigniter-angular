<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products_model extends CI_Model 
{
	

	public function get_products_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('products');
            $this->db->where('category_id', $id);
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

        } else {
            return null;
        }

    }



public function count_products_category_search_public($user_id, $title=NULL, $description=NULL, $brand=NULL)
	{
	$this->db->select('*');
	$this->db->from('products');
	$this->db->where("FIND_IN_SET(".$user_id.",products.category_id) >", 0);
	$this->db->where('products.is_active', 1);

	if($title!=NULL)
    $this->db->like('title', $title);
	if($description!=NULL)
    $this->db->like('description', $description);
	if($brand!=NULL)
    $this->db->like('brand_id', $brand);
	return $this->db->count_all_results();
	
	}

public function get_list_category($user_id, $_start, $_limit, $_sort, $title, $description, $brand, $orderByType, $orderBy)
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->like('products.title', $title);
			$this->db->like('products.description', $description);
			$this->db->like('products.brand_id', $brand);
			$this->db->where("FIND_IN_SET(".$user_id.",products.category_id) >", 0);


			$this->db->order_by($orderByType, $orderBy); 

			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }

	

}



public function get_list_public($_start, $_limit, $_sort, $title, $description, $brand, $code, $orderBy, $orderByType)
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->like('products.title', $title);
			$this->db->like('products.description', $description);
			$this->db->like('products.brand_id', $brand);
			$this->db->like('products.code', $code);
			$this->db->where('products.is_active', 1);

			$this->db->order_by($orderByType, $orderBy); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }

	

}



public function count_products_search_public($title=NULL, $description=NULL, $brand=NULL, $code=NULL)
	{
	$this->db->select('*');
	$this->db->from('products');
	$this->db->where('products.is_active', 1);

	if($title!=NULL)
    $this->db->like('title', $title);
	if($description!=NULL)
    $this->db->like('description', $description);
	if($brand!=NULL)
    $this->db->like('brand_id', $brand);
	if($code!=NULL)
    $this->db->like('code', $code);
	return $this->db->count_all_results();
	
	}



public function get_products_calendar()
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	

public function get_products($user_id)
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('products.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}



public function get_list($user_id, $_start, $_limit, $_sort, $title, $description, $code, $code_int, $brand)
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->like('products.title', $title);
			$this->db->like('products.description', $description);
			$this->db->like('products.code', $code);
			$this->db->like('products.code_int', $code_int);
			$this->db->like('products.brand_id', $brand);
			$this->db->where('products.user_id', $user_id);

			$this->db->order_by('id', 'DESC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }

	

}


	public function count_products_search($title=NULL, $description=NULL, $code=NULL, $code_int=NULL, $brand=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('products');
	$this->db->where('products.user_id', $user_id);

	if($title!=NULL)
    $this->db->like('title', $title);
	if($description!=NULL)
    $this->db->like('description', $description);
	if($code!=NULL)
    $this->db->like('code', $code);
	if($code_int!=NULL)
    $this->db->like('code_int', $code_int);
	if($brand!=NULL)
    $this->db->like('brand_id', $brand);
	return $this->db->count_all_results();
	
	}


public function count_products($id)
	{
	$this->db->select('*');
	$this->db->from('products');
	$this->db->where('products.user_id', $id);

	echo $this->db->count_all_results();

	}




public function get_products_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('date(Date)',$curr_date);//use date function
			$this->db->order_by('date','ASC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function get_id($id)
	{

		$this->db->select('products.*, u.first_name, u.last_name');
			$this->db->from('products');
			$this->db->join('users u', 'u.id=products.user_id');
			$this->db->where('products.id', $id);
			$query = $this->db->get();
			return $query->row();
	}




	public function get_id_public($id)
	{


			$this->db->select('products.*');
			$this->db->from('products');
			$this->db->where('products.id', $id);
			$query = $this->db->get();
			return $query->row();
	}






	

	

	public function login($username, $password) 
	{
		$this->db->where('username', $username);
		$this->db->where('password', md5($password));
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return $query->row();
		}
	}


	public function checkToken($token)
	{
		$this->db->where('token', $token);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}

	public function create($blogData)
	{
		$this->db->insert('products', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('products', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('products');
	}


}
