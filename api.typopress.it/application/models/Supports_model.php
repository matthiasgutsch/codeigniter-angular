<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Supports_model extends CI_Model 
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
	


	public function get_tickets_support_id($id)
	{
      
            $this->db->select('*');
            $this->db->from('supports');
            $this->db->where('ref_id', $id);
			$this->db->order_by('created_at','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

    }



public function get_tickets($user_id)
	{

			$this->db->select('*');
            $this->db->from('supports');
			$this->db->where('supports.user_id', $user_id);
			$this->db->where('supports.ref_id', 0);
			$this->db->order_by("is_active", "desc");
			$this->db->order_by("created_at", "asc"); 

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


public function get_tickets_active($user_id)
	{

			$this->db->select('*');
            $this->db->from('supports');
			$this->db->where('supports.user_id', $user_id);
			$this->db->where('supports.ref_id', 0);
			$this->db->where('supports.is_active', 1);

			$this->db->order_by('created_at','DESC');
			$this->db->limit(5);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function count_supports($id)
	{
	$this->db->select('*');
	$this->db->from('supports');
	$this->db->where('supports.user_id', $id);
	$this->db->where('supports.ref_id', 0);
	$this->db->where('supports.is_active', 1);

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

		$this->db->select('supports.*, u.first_name, u.last_name');
			$this->db->from('supports');
			$this->db->join('users u', 'u.id=supports.user_id');
			$this->db->where('supports.id', $id);
			$query = $this->db->get();
			return $query->row();
	}




	public function get_products_data($id = null, $user_id)
		{
	        if ($id != null) {
	            $this->db->select('*');
	            $this->db->from('products_data');
	            $this->db->where('product_id', $id);
				$this->db->where('user_id', $user_id);

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
		$this->db->insert('supports', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('supports', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('supports');
	}


}
