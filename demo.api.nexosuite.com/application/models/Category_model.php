<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category_model extends CI_Model 
{


	public function get_categories($user_id)
	{


			$this->db->select('*');
            $this->db->from('categories');
			$this->db->where('categories.user_id', $user_id);
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}


public function get_categories_public()
	{


			$this->db->select('*');
            $this->db->from('categories');
			$this->db->where('categories.is_active', '1');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

	}



	public function count_categories($category_name=NULL, $category_description=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('categories');
	$this->db->where('categories.user_id', $user_id);

	if($category_name!=NULL)
    $this->db->like('category_name', $category_name);
	if($category_description!=NULL)
    $this->db->like('category_description', $category_description);
	
	return $this->db->count_all_results();
	
	}



public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('categories');
			$this->db->like('categories.category_name', $category_name);
			$this->db->like('categories.category_description', $category_description);
			$this->db->where('categories.user_id', $user_id);

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


	

	public function get_id($id)
	{

			$this->db->select('categories.*');
			$this->db->from('categories');
			$this->db->where('categories.id', $id);
			$query = $this->db->get();
			return $query->row();
	}


	
	public function get_id_public($id)
	{

			$this->db->select('categories.*');
			$this->db->from('categories');
			$this->db->where('categories.category_seo_url', $id);
			$query = $this->db->get();
			return $query->row();
	}




	public function create($categoryData)
	{
		$this->db->insert('categories', $categoryData);
		return $this->db->insert_id();
	}




	public function update($id, $categoryData)
	{
		$this->db->where('id', $id);
		$this->db->update('categories', $categoryData);
	}



	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('categories');
	}

}
