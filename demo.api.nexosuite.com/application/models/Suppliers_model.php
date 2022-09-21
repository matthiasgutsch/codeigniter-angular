<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Suppliers_model extends CI_Model 
{
	







public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('suppliers');
			$this->db->like('suppliers.company_name', $category_name);
			$this->db->like('suppliers.name', $category_description);
			$this->db->where('suppliers.user_id', $user_id);


			$this->db->order_by('suppliers.company_name', 'ASC'); 
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



	

	public function count_suppliers_search($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('suppliers');
	$this->db->where('suppliers.user_id', $user_id);

	if($category_name!=NULL)
    $this->db->like('company_name', $category_name);
	if($category_description!=NULL)
    $this->db->like('name', $category_description);
	
	return $this->db->count_all_results();
	
	}



	public function get_suppliers()
	{
			$this->db->select('*');
            $this->db->from('suppliers');
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}





	public function get_client_name($id) {

            $this->db->select('*');
            $this->db->from('suppliers');
            $this->db->where('suppliers.id', $id);
			$query = $this->db->get();
			return $query->row();

    }




	public function get_suppliers_user($id)
	{
			$this->db->select('*');
            $this->db->from('suppliers');
			$this->db->where('suppliers.user_id', $id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}



	public function count_suppliers($id)
	{
	$this->db->select('*');
	$this->db->from('suppliers');
	$this->db->where('suppliers.user_id', $id);

	echo $this->db->count_all_results();

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


	public function get_id($id)
		{
			$this->db->select('suppliers.*, u.first_name, u.last_name');
			$this->db->from('suppliers');
			$this->db->join('users u', 'u.id=suppliers.user_id');
			$this->db->where('suppliers.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	public function search($id)
		{

			$this->db->select('*');
			$this->db->from('suppliers');
			$this->db->where('suppliers.username', $id);
			$query = $this->db->get();
			return $query->row();
	}


	public function create($blogData)
	{
		$this->db->insert('suppliers', $blogData);
		return $this->db->insert_id();
	}

	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('suppliers');
	}



	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('suppliers', $blogData);
	}



}
